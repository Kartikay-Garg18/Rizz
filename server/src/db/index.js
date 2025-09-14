import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DB}`);
    }
    catch(err){
        process.exit(1);
    }
}

export default connectDB;