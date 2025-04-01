const InfoTurf = require('../model/info_turf');

exports.handleButtonPress = async (req, res) => {
    try {
        const turfInfo = await InfoTurf.findOne({ adminid: req.body.tokenid });

        if (!turfInfo) {
            const timings = Array.from({ length: 24 }, (_, i) => ({
                time: `${i.toString().padStart(2, "0")}:00`,
                status: "NA",
            }));

            const newTurfInfo = {
                adminid: req.body.tokenid,
                turfname: "",
                location: "",
                pricewithlight: "",
                pricewithoutlight: "",
                starttimewithoutlight: "",
                endtimewithoutlight: "",
                turftiming: timings,
            };

            return res.status(200).json({
                Status: "Save",
                Message: "Information Does Not Exist",
                info: newTurfInfo,
            });
        }

        res.status(200).json({
            Status: "Edit",
            Message: "Information Exists",
            info: turfInfo,
        });
    } catch (error) {
        res.status(500).json({ Status: "Failed", Message: "Error in fetching Turf Information" });
    }
};

exports.saveTurfInfo = async (req, res) => {
    try {
        const existingTurf = await InfoTurf.findOne({ adminid: req.body.tokenid });

        if (existingTurf) {
            return res.status(400).json({
                Status: "Failed",
                Message: "Information Already Exists. Please Edit.",
            });
        }

        const newTurf = new InfoTurf(req.body.info);
        await newTurf.save();

        res.status(201).json({
            Status: "Success",
            Message: "Information Saved Successfully",
        });
    } catch (error) {
        res.status(500).json({ Status: "Failed", Message: "Error in saving Turf Information" });
    }
};

exports.editTurfInfo = async (req, res) => {
    try {
        const turfInfo = await InfoTurf.findOne({ adminid: req.body.tokenid });

        if (!turfInfo) {
            return res.status(404).json({
                Status: "Failed",
                Message: "Information Does Not Exist. Cannot Edit",
            });
        }

        Object.assign(turfInfo, req.body.info);
        await turfInfo.save();

        res.status(200).json({
            Status: "Success",
            Message: "Information Edited Successfully",
        });
    } catch (error) {
        res.status(500).json({ Status: "Failed", Message: "Error in editing Turf Information" });
    }
};
