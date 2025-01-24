import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { signUpSchema } from "../schemas/signup.schema.js";
import { loginSchema } from "../schemas/login.schema.js";

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const result = signUpSchema.safeParse({username, email, password});

    if(!result.success){
        return res.status(400)
        .json(new ApiResponse(400, '', result.error.errors[0].message));
    }

    const checkUsername = await User.findOne({username});

    if(checkUsername){
        return res.status(400)
        .json(new ApiResponse(400, '', 'Username already exists'));
    }

    const checkUser = await User.findOne({email});

    if(checkUser){
        return res.status(400)
        .json(new ApiResponse(400, '', 'User with same email address exists'));
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({username, email, password : hashedpassword});

    if(!user){
        return res.status(500)
        .json(new ApiResponse(500, '', 'User could not be created'));
    }

    return res.status(201)
    .json(new ApiResponse(201, '','User created successfully'));
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = loginSchema.safeParse({email, password});

    if(!result.success){
        return res.status(400)
        .json(new ApiResponse(400, '', result.error.errors[0].message));
    }

    const checkUser = await User.findOne({email});

    if(!checkUser){
        return res.status(404)
        .json(new ApiResponse(404, '', 'User does not exist'));
    }

    const isMatch = await checkUser.matchPassword(password);

    if(!isMatch){
        return res.status(400)
        .json(new ApiResponse(400, '', 'Invalid credentials'));
    }

    const {accessToken, refreshToken} = await generateToken(checkUser._id);

    if(!accessToken || !refreshToken){
        return res.status(500)
        .json(new ApiResponse(500, '', 'Token generation failed'));
    }

    const options = {
        httpOnly: false,
        secure : false,
        sameSite: 'Strict',
    }
    const loggedInUser = {email: checkUser.email, username: checkUser.username, profilePictureUrl: checkUser.profilePictureUrl};

    return res.status(200)
    .cookie('accessToken', accessToken, {...options,
        maxAge: 24 * 60 * 60 * 1000,
    })
    .cookie('refreshToken', refreshToken, {...options,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(new ApiResponse(200, {loggedInUser, accessToken, refreshToken}, 'User logged in successfully'));
})

const generateToken = async (id) => {
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(500)
            .json(new ApiResponse(500, '', 'User not found'));
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        if(!accessToken || !refreshToken){
            return res.status(500)
            .json(new ApiResponse(500, '', 'Token generation failed'));
        }

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken};

    } catch (error) {
        return res.status(500)
        .json(new ApiResponse(500, '', 'Token generation failed'));        
    }

}

const getCurrentUser = asyncHandler(async (req, res) => {
    const loggedInUser = req.user;
    return res.status(200)
    .json(new ApiResponse(200, loggedInUser, 'User retrieved successfully'));
})

export {createUser, loginUser, generateToken, getCurrentUser};