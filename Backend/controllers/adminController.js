const bcrypt = require('bcryptjs');
const Credadmin = require('../model/cred_admin');

exports.registerAdmin = async (req, res) => {
    try {
        const { userid, password } = req.body.credentials;
        const existingUser = await Credadmin.findOne({ userid });

        if (existingUser) {
            return res.status(400).json({ Status: "Failed", Message: "User ID Already Exists" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new Credadmin({ userid, password: hash });
        await newUser.save();

        res.status(201).json({ Status: "Success", Message: "Registered Successfully" });
    } catch (error) {
        res.status(500).json({ Status: "Failed", Message: "Error in Registration" });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { userid, password } = req.body.credentials;
        const user = await Credadmin.findOne({ userid });

        if (!user) {
            return res.status(404).json({ Status: "Failed", Message: "User ID Does Not Exist" });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ Status: "Failed", Message: "Incorrect Password" });
        }

        res.status(200).json({ Status: "Success", tokenid: user._id });
    } catch (error) {
        res.status(500).json({ Status: "Failed", Message: "Error in Login" });
    }
};
