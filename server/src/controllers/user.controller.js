import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { signUpSchema, passwordValidation } from "../schemas/signup.schema.js";
import { loginSchema } from "../schemas/login.schema.js";
import { GoogleUser } from "../models/googleuser.model.js";
import { oauth2Client } from "../utils/googleConfig.js";
import axios from "axios";
import { Resend } from "resend";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const result = signUpSchema.safeParse({ username, email, password });

  if (!result.success) {
    return res
      .status(400)
      .json(new ApiResponse(400, "", result.error.errors[0].message));
  }

  const checkUsername = await User.findOne({ username });

  if (checkUsername) {
    return res
      .status(400)
      .json(new ApiResponse(400, "", "Username already exists"));
  }

  const checkUser = await User.findOne({ email });

  if (checkUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, "", "User with same email address exists"));
  }

  const user = await User.create({ username, email, password });

  if (!user) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "User could not be created"));
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "", "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = loginSchema.safeParse({ email, password });

  if (!result.success) {
    return res
      .status(400)
      .json(new ApiResponse(400, "", result.error.errors[0].message));
  }

  const checkUser = await User.findOne({ email });

  if (!checkUser) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "User does not exist"));
  }

  const isMatch = await checkUser.matchPassword(password);

  if (!isMatch) {
    return res
      .status(400)
      .json(new ApiResponse(400, "", "Invalid credentials"));
  }

  const { accessToken, refreshToken } = await generateToken(
    checkUser._id,
    User
  );

  if (!accessToken || !refreshToken) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "Token generation failed"));
  }

  const options = {
    httpOnly: false,
    secure: false,
    sameSite: "Strict",
  };
  const loggedInUser = {
    id: checkUser._id,
    email: checkUser.email,
    username: checkUser.username,
    profilePictureUrl: checkUser.profilePictureUrl,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const generateToken = async (id, db) => {
  try {
    const user = await db.findById(id);
    if (!user) {
      return res.status(500).json(new ApiResponse(500, "", "User not found"));
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    if (!accessToken || !refreshToken) {
      return res
        .status(500)
        .json(new ApiResponse(500, "", "Token generation failed"));
    }

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "Token generation failed"));
  }
};

const getCurrentUser = asyncHandler(async (req, res) => {
  const checkUser = req.user;
  const loggedInUser = {
    id: checkUser._id,
    email: checkUser.email,
    username: checkUser.username,
    profilePictureUrl: checkUser.profilePictureUrl,
  };
  return res
    .status(200)
    .json(new ApiResponse(200, loggedInUser, "User retrieved successfully"));
});

const googleLoginUser = asyncHandler(async (req, res) => {
  const { code } = req.query;
  const googleResponse = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(googleResponse.tokens);
  const userData = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleResponse.tokens.access_token}`
  );
  const { email, name, picture } = userData.data;
  let user = await GoogleUser.findOne({ email });
  if (!user) {
    user = await GoogleUser.create({
      username: name,
      email: email,
      profilePictureUrl: picture,
    });
    if (!user) {
      return res
        .status(500)
        .json(new ApiResponse(500, "", "User could not be created"));
    }
  }
  const { accessToken, refreshToken } = await generateToken(
    user._id,
    GoogleUser
  );

  if (!accessToken || !refreshToken) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "Token generation failed"));
  }

  const options = {
    httpOnly: false,
    secure: false,
    sameSite: "Strict",
  };
  const loggedInUser = {
    id: user._id,
    email: email,
    username: name,
    profilePictureUrl: picture,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const verifycode = Math.floor(100000 + Math.random() * 900000).toString();
  const codeExpiry = new Date(Date.now() + 10 * 60 * 1000);
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, "", "User does not exist"));
  }

  const { data, error } = await resend.emails.send({
    from: "Rizz <rizz@resend.dev>",
    to: email,
    subject: "Reset your password",
    html: `Dear ${user.username},<br><br>
            Just one more step before you get started.
            <br>
            You must confirm your identity using this one-time pass code: <strong>${verifycode}</strong>
            <br>
            Note: This code will expire in 10 minutes.
            <br><br>
            Sincerely,
            <br>
            Rizz Developement Team`,
  });

  if (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, "", "Email could not be sent"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { verifycode, codeExpiry },
        "Email sent successfully"
      )
    );
});

const resetPassword = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = passwordValidation.safeParse(password);
        if (!result.success) {
            return res.status(400).json(new ApiResponse(400, "", result.error.errors[0].message));
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.findOneAndUpdate({ email }, { password: hashedpassword });
        if (!user) {
            return res.status(404).json(new ApiResponse(404, "", "User does not exist"));
        }
        return res.status(200).json(new ApiResponse(200, "", "Password reset successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, "", "Password could not be reset"));
    }
});

export {
  createUser,
  loginUser,
  generateToken,
  getCurrentUser,
  googleLoginUser,
  forgotPassword,
  resetPassword,
};
