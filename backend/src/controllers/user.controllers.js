import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.models.js";

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

  if (
    [username, email, password].some((field) => field.trim() === "")
  ) {
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

export { registerUser };
