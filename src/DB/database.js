import mongoose from "mongoose";

const connectDb = async () =>{
    try {
        const instance = await mongoose.connect(`${process.env.MONGODB_URI}/dealsdray`)
        console.log("mongoDb connection sucess: ", instance.connection.host);
    } catch (error) {
        console.log("mongoDb connection failed: ", error);
        process.exit(1);
    }
}

export default connectDb