import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";

//Generate Access Token and Refresh Token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //Fetch data from the request
  //Check if the fetched data from the request is null  or not
  //check if user exits or not
  //then check if there are images or not
  //if there are then upload them if there are not then dont upload them and  send an apiError
  //If everythign is completed the save the user
  //remove password and refresh token field from the user object in response
  //check if user created
  //return res

  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "Enter The Credentials");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User alreaddy exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar Is Missing");
  }

  const uploadAvatar = await uploadOnCloudinary(avatarLocalPath);

  if (!uploadAvatar) {
    throw new ApiError(400, "Avatar was not uploaded");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    avatar: uploadAvatar.url,
  });

  const registerUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!registerUser) {
    throw new ApiError(400, "");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, registerUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  //Get data from the body
  //check if the data is valid or exists
  //check if the user exist or not
  //check if the password is correct
  //if the password is correct then generate access and refresh token
  //Store the tokens in cookies and then send them in the response
  //return res

  const { email, password } = req.body;
  
  if (!(email || password)) {
    throw new ApiError(400, "Your email or password is missing!!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid User Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User
    .findById(user._id)
    .select("-password -refreshToken");

  if (!loggedInUser) {
    throw new ApiError(400, "Error While Logging In User");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User Logged In Successfully"
      )
    );
});

const logout = asyncHandler(async(req,res) => {
  //Fetch the user from the request that was passed from the auth middleware
  //clear the access and REFRESH TOKEN
  //user.findById()


  const user = await User.findByIdAndUpdate(req.user._id, {$set: {refreshToken: undefined}},{new: true})

  const options = {
    httpOnly: true,
    secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(new ApiResponse(200,{user} ,"User logged out Successfully"))



})

export { registerUser , loginUser, logout};
