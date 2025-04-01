const SchTurf = require("../model/sch_truf");
const InfoTurf = require("../model/info_turf");
const moment = require("moment");

// Function to generate date range
const generateDateRange = (start, end) => {
  let dates = [];
  let currentDate = moment(start);
  const endDate = moment(end);

  while (currentDate.isSameOrBefore(endDate)) {
    dates.push(currentDate.format("YYYY-MM-DD"));
    currentDate.add(1, "days");
  }

  return dates;
};

exports.scheduleTurf = async (req, res) => {
  try {
    const { tokenid, startdate, enddate, turftiming } = req.body;
    const formattedStartDate = moment(startdate).format("YYYY-MM-DD");
    const formattedEndDate = moment(enddate).format("YYYY-MM-DD");

    const turfInfo = await InfoTurf.findOne({ adminid: tokenid });

    if (!turfInfo) {
      return res.status(400).json({
        Status: "Failed",
        Message: "Unable to fetch Turf Information",
      });
    }

    // Check if any existing schedule overlaps
    const existingSchedules = await SchTurf.find({
      turfid: turfInfo._id,
      schdate: { $gte: formattedStartDate, $lte: formattedEndDate },
    }).sort({ schdate: "asc" });

    if (existingSchedules.length > 0) {
      return res.status(400).json({
        Status: "Failed",
        Message: `Failed to schedule. Already Scheduled for ${existingSchedules[0].schdate}`,
      });
    }

    // Generate schedule dates
    const scheduleDates = generateDateRange(
      formattedStartDate,
      formattedEndDate
    );

    // Save all schedules in one go (Bulk Insert)
    const schedulesToInsert = scheduleDates.map((date) => ({
      turfid: turfInfo._id,
      schdate: date,
      turftiming: turftiming,
    }));

    await SchTurf.insertMany(schedulesToInsert);

    res.status(201).json({
      Status: "Success",
      Message: "Turf Scheduled Successfully",
    });
  } catch (error) {
    res.status(500).json({
      Status: "Failed",
      Message: "Error in scheduling Turf",
    });
  }
};
