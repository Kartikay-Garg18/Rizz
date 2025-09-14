import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
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
            required: function() {
                return this.authProvider === 'local';
            },
            min: [8, 'Password must be at least 8 characters long'],
        },
        profilePictureUrl: {
            type: String,
            default: '',   
        },
        about: {
            type: String,
            default: '',
            maxlength: [500, 'About section cannot exceed 500 characters'],
        },
        authProvider: {
            type: String,
            enum: ['local', 'google'],
            default: 'local',
            required: true,
        },
        googleId: {
            type: String,
            sparse: true,
        },
        refreshToken: {
            type: String,
            default: '',
        },
          
    }, { timestamps: true }
);

userSchema.pre('save', async function(next) {
    
    if (!this.isModified('password') || this.authProvider !== 'local') {
        return next();
    }
    
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.matchPassword = async function(password) {
    if (this.authProvider !== 'local') {
        return false;
    }
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        authProvider: this.authProvider,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        authProvider: this.authProvider,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

export const User = mongoose.model('User', userSchema);