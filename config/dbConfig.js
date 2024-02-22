import mongoose from "mongoose";

export const connectToDB = async () => {
    const mongoURI = process.env.DB_CONNECTION || "mongodb+srv://racheli:bdognom1!@cluster0.8xcf31s.mongodb.net/?retryWrites=true&w=majority";
    try {
        let suc = await mongoose.connect(mongoURI)
        console.log("mongo db connected sucessfully!!!", suc.connection.host)
    }
    catch (err) {
        console.log("cannot connect mongoDB")
        console.log(err)
        process.exit(1);
    }

}