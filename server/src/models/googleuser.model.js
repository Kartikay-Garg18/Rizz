import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const googleUserSchema= new mongoose.Schema(
    {
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
        profilePictureUrl: {
            type: String,
            default: '',   
        },
        refreshToken: {
            type: String,
            default: '',
        },
          
    },{timestamps: true}
);

googleUserSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id : this._id,
        username: this.username,
        email: this.email,
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
}

googleUserSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id : this._id,
        username: this.username,
        email: this.email,
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
}


export const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);