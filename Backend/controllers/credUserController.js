const bcrypt = require('bcryptjs');
const Creduser = require('../model/cred_user');

// Controller function for user registration
async function registerUser(req, res) {
    try {
        const data = await Creduser.find({ userid: req.body.credentials.userid });
        let resp;
        if (data.length > 0) {
            resp = { "Status": "Failed", "Message": "User ID Already Exists" };
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.credentials.password, salt);
            const newuser = new Creduser({
                userid: req.body.credentials.userid,
                password: hash,
            });
            await newuser.save();
            resp = { "Status": "Success", "Message": "Registered Successfully" };
        }
        res.status(200).json(resp);
    } catch (error) {
        const resp = { "Status": "Failed", "Message": "Error in registration" };
        res.status(500).json(resp);
    }
}

// Controller function for user login
async function loginUser(req, res) {
    try {
        const data1 = await Creduser.find({ userid: req.body.credentials.userid });
        let resp;
        if (data1.length === 1) {
            const hash = data1[0].password;
            const value = bcrypt.compareSync(req.body.credentials.password, hash);
            if (value === false) {
                resp = { "Status": "Failed", "Message": "Incorrect Password" };
            } else {
                resp = { "Status": "Success", "tokenid": data1[0]._id };
            }
        } else {
            resp = { "Status": "Failed", "Message": "User ID Does Not Exist" };
        }
        res.status(200).json(resp);
    } catch (error) {
        const resp = { "Status": "Failed", "Message": "Error in login" };
        res.status(500).json(resp);
    }
}

module.exports = { registerUser, loginUser };
