import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DB}`);
        console.log('MongoDB connected successfully !!');
    }
    catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;