const SchTurf = require('../model/sch_truf');
const InfoTurf = require('../model/info_turf');
const UserProfile = require('../model/user_profile');
const moment = require('moment');

exports.fetchAvailableTurfs = async (req, res) => {
    try {
        req.body.bookingdate = moment(req.body.bookingdate).format("YYYY-MM-DD");
        const turfList = await SchTurf.find({ schdate: req.body.bookingdate, 'turftiming.status': "A" });

        if (turfList.length === 0) {
            return res.status(404).json({ Status: "NA", Message: "No Turf Available For Booking" });
        }

        const availableTurfs = [];
        for (const turf of turfList) {
            const availableTimes = turf.turftiming.filter(slot => 
                slot.time >= req.body.bookingtime && slot.status === "A"
            );

            if (availableTimes.length > 0) {
                const turfInfo = await InfoTurf.findById(turf.turfid);
                availableTurfs.push({
                    turfname: turfInfo?.turfname || "Unknown",
                    turfid: turf.turfid,
                    schdate: turf.schdate,
                    turftiming: availableTimes    
                });
            }     
        }

        if (availableTurfs.length === 0) {
            return res.status(404).json({ Status: "NA", Message: "No Turf Available For Booking" });
        }

        res.status(200).json({ Status: "A", Message: "Turf Available", turflis: availableTurfs });
    } catch (error) {
        res.status(500).json({ Status: "Failed", Message: "Error in fetching Available Turfs" });
    }
};

const isTimeIncluded = (list, time) => list.includes(time);

exports.saveBooking = async (req, res) => {
    try {
        const customerDetails = await UserProfile.findOne({ userid: req.body.tokenid });
        if (!customerDetails) {
            return res.status(400).json({ Status: "Failed", Message: "Booking Failed. Please Update Profile First." });
        }

        const turfList = await SchTurf.findOne({ schdate: req.body.bookingdtls.schdate, turfid: req.body.bookingdtls.turfid });
        if (!turfList) {
            return res.status(404).json({ Status: "Failed", Message: "Turf not found" });
        }

        for (const slot of turfList.turftiming) {
            if (isTimeIncluded(req.body.bookingdtls.selectedtiming, slot.time)) {
                if (slot.status === "A") {
                    slot.status = "B";
                    slot.cstmrid = customerDetails._id;
                } else {
                    return res.status(400).json({ Status: "Failed", Message: `Booking Failed. Turf Slot For ${slot.time} Already Booked` });
                }
            }
        }

        await turfList.save();
        res.status(200).json({ Status: "Success", Message: "Turf Booked Successfully" });
    } catch (error) {
        res.status(500).json({ Status: "Failed", Message: "Error in booking turf" });
    }
};
