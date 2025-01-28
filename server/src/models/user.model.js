import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema= new mongoose.Schema(
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
        password: {
            type: String,
            required: true,
            min: [8, 'Password must be at least 8 characters long'],
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

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id : this._id,
        username: this.username,
        email: this.email,
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'});
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id : this._id,
        username: this.username,
        email: this.email,
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
}

export const User= mongoose.model('User', userSchema);