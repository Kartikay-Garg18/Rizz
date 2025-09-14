import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers['authorization']?.replace('Bearer ', '');
        if(!token){
            throw new ApiError(401, 'Unauthorized Token');
        }
    
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodeToken._id).select('-password -refreshToken');

        if(!user){
            throw new ApiError(401, 'User not found');
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, 'Unauthorized');
    }
});

export { verifyJWT };