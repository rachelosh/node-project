import  jwt  from "jsonwebtoken";

export const generateToken = (user) => {
    let token = jwt.sign(
        { _id: user._id, userName: user.userName, roles: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: "60m"
        }
    )
    return token;
}