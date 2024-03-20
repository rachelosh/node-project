import { User, userValidator } from "../models/user.js";
import { generateToken } from "../config/jwt.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
    try {
        let allusers = await User.find({}, "-password");
        res.json(allusers);
    }
    catch (err) {
        res.status(500).send("an error occured in....")
    }
}
export const login = async (req, res) => {
    let { email, userName, password } = req.body;
    let userValidat = userValidator({ email, userName, password })
    if (userValidat.error)
        return res.status(400).send(userValidat.error[0])
    let filter = {
        email,
        userName
    }

    try {
        let loggedUser = await User.findOne(filter);
        if (!loggedUser)
            return res.status(400).send("no user with such credentials");
        if (!await bcrypt.compare(password, loggedUser.password))
            return res.status(400).send("no user with such credentials");
        let { _id, email, userName, role } = loggedUser;
        let token = generateToken(loggedUser);
        res.json({ _id, email, userName, role, token });
    }

    catch (err) {
        res.status(500).send("an error occured in....")
    }
}
export const addUser = async (req, res) => {
    let { email, userName, password } = req.body;
    let userValidat = userValidator(req.body);
    if (userValidat.error)
        return res.status(400).send(userValidat.error.message)
    try {
        let hashedPassword = await bcrypt.hash(password, 15);
        let newUser = await User.create({ userName, password: hashedPassword, email });
        let { _id, userName: u, email: e, role, signUpDate } = newUser;
        let token = generateToken(newUser);
        res.json({ _id, userName: u, email: e, role, signUpDate, token });
    }
    catch (err) {
        res.status(500).send("an error occured in....")
    }
}