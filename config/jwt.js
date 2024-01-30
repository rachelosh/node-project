export const generateToken = (user) => {
    let token = jwt.sign(
        { _id: user._id, userName: user.userName, roles: user.roles },
        process.env.JWT_SECRET,
        {
            expiresIn: "20m"
        }
    )

    return token;

}