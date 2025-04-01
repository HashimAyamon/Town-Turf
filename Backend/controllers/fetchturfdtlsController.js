const InfoTurf = require('../model/info_turf');
const SchTurf = require('../model/sch_truf');
const UsrProfile = require('../model/user_profile');
const moment = require('moment');

exports.fetchTurfDetails = async (req, res) => {
    try {
        const schdate1 = moment(req.body.schdate).format("YYYY-MM-DD");
        const turfInfo = await InfoTurf.findOne({ adminid: req.body.tokenid });

        if (!turfInfo) {
            return res.status(404).json({ Status: "Failed", Message: `No turf scheduled on: ${schdate1}` });
        }

        const scheduledTurf = await SchTurf.findOne({ turfid: turfInfo._id, schdate: schdate1 });

        if (!scheduledTurf) {
            return res.status(404).json({ Status: "Failed", Message: `No turf scheduled on: ${schdate1}` });
        }

        const turfDetails = await Promise.all(
            scheduledTurf.turftiming.map(async (slot) => {
                let details = {
                    time: slot.time,
                    price: slot.price,
                    mobile: "-",
                    name: "-",
                    status: getStatusText(slot.status),
                };

                if (slot.status === "B") {
                    const user = await UsrProfile.findById(slot.cstmrid);
                    if (user) {
                        details.name = user.username;
                        details.mobile = user.phoneno;
                    }
                }

                return details;
            })
        );

        res.status(200).json({ Status: "Success", Message: "Fetched Successfully", Data: turfDetails });
    } catch (error) {
        res.status(500).json({ Status: "Failed", Message: "Error in fetching Turf History" });
    }
};

const getStatusText = (status) => {
    const statusMap = {
        B: "Booked",
        A: "Available",
        NB: "Not Booked",
        NA: "Not Scheduled",
    };
    return statusMap[status] || "Unknown";
};
