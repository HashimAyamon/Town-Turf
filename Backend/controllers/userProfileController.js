const UsrProfile = require('../model/user_profile');

// Controller function to fetch user profile
async function fetchUserProfile(req, res) {
    try {
        const profiledtls = await UsrProfile.find({ userid: req.body.tokenid });
        let resp;

        if (profiledtls.length === 0) {
            const prof = {
                username: "",
                phoneno: "",
                emailid: ""
            };
            resp = { "Status": "Save", "Message": "Profile Details Does Not Exist", "profile": prof };
        } else if (profiledtls.length === 1) {
            resp = { "Status": "Edit", "Message": "Profile Details Exists", "profile": profiledtls[0] };
        } else {
            resp = { "Status": "Failed", "Message": "Unable to fetch Profile Details" };
        }
        
        res.status(200).json(resp);
    } catch (error) {
        const resp = { "Status": "Failed", "Message": "Error in fetching Profile Details" };
        res.status(500).json(resp);
    }
}

// Controller function to save user profile
async function saveUserProfile(req, res) {
    try {
        const profiledtls = await UsrProfile.find({ userid: req.body.tokenid });
        let resp;

        if (profiledtls.length > 0) {
            resp = { "Status": "Failed", "Message": "Profile Details Already Saved. Please Edit." };
        } else {
            const profobj = new UsrProfile(req.body.profile);
            profobj["userid"] = req.body.tokenid;
            await profobj.save();
            resp = { "Status": "Success", "Message": "Profile Details Saved Successfully" };
        }

        res.status(200).json(resp);
    } catch (error) {
        const resp = { "Status": "Failed", "Message": "Error in saving Profile Details" };
        res.status(500).json(resp);
    }
}

// Controller function to edit user profile
async function editUserProfile(req, res) {
    try {
        const usrdtls = await UsrProfile.find({ userid: req.body.tokenid });
        let resp;

        if (usrdtls.length === 1) {
            usrdtls[0].username = req.body.profile.username;
            usrdtls[0].emailid = req.body.profile.emailid;
            usrdtls[0].phoneno = req.body.profile.phoneno;
            await usrdtls[0].save();
            resp = { "Status": "Success", "Message": "Profile Details Edited Successfully" };
        } else if (usrdtls.length === 0) {
            resp = { "Status": "Failed", "Message": "Profile Details Does Not Exist. Cannot Edit" };
        } else {
            resp = { "Status": "Failed", "Message": "Unable to fetch Profile Details. Cannot Edit" };
        }

        res.status(200).json(resp);
    } catch (error) {
        const resp = { "Status": "Failed", "Message": "Error in editing Profile Details" };
        res.status(500).json(resp);
    }
}

module.exports = { fetchUserProfile, saveUserProfile, editUserProfile };
