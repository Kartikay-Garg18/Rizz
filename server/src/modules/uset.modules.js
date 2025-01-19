import mongoose from 'mongoose';

const userSchema= new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: [8, 'Password must be at least 8 characters long'],
            max: 24,
        },
        profilePictureUrl: {
            type: String,
            default: '',   
        },
          

    },{timestamps: true}
);

export const User= mongoose.model('User', userSchema);