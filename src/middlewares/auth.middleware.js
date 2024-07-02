import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // Check both cookies and headers for the token
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    // Log the token for debugging
    console.log('Token:', token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('Decoded Token:', decodedToken);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
