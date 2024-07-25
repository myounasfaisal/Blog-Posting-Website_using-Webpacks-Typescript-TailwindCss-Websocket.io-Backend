import { User } from "../models/user.model.js";
import { apiErrors } from "../utils/apiErrors.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { uploadOnCloudinary } from "../utils/fileUpload(Cloudinary).js";
import cookieParser from "cookie-parser";

//Start
const generateAccessTokenAndRefreshToken = async (user) => {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error : ", error);
  }

  //end
};

//start
const registerUser = asyncWrapper(async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    if (
      [name, email, password, username].some((field) => field?.trim() == "")
    ) {
      throw new apiErrors("All Fields are Required", 405);
    }

    const avatar = req.file;
    if (!avatar) {
      throw new apiErrors("Avatar Not Found", 404);
    }
    const avatarLocalPath = avatar?.path;

    const resAvatar = await uploadOnCloudinary(avatarLocalPath);

    if (!resAvatar) {
      throw new apiErrors("Avatar Failed To Upload", 505);
    }
    console.log(resAvatar);

    const user = await User.create({
      name,
      email,
      password,
      username,
      avatar: resAvatar.url,
    });

    if (!user) {
      throw new apiErrors("User Failed To Created", 500);
    }
    return res
      .status(200)
      .json(new apiResponse("User Created Successfully", 200, user));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new apiErrors("Failed To Register", 500));
  }

  //end
});

//start
const loginUser = asyncWrapper(async (req, res) => {
  try {
    const { username, password } = req.body;

    if ([username, password].some((field) => field?.trim() == "")) {
      throw new apiErrors("Username or Email is required", 405);
    }

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    }).select("-password -refreshToken");

    if (!user) {
      throw new apiErrors("User Not Found", 404);
    }

    const passwordValidity = await user.comparePassword(password);

    if (!passwordValidity) {
      throw new apiErrors("Invalid Password", 406);
    }

    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(user);

    if (!accessToken && !refreshToken) {
      throw new apiErrors("Failed To Generate Token", 404);
    }

    //Not Using Cookies To Store The Tokens As they are not getting Stored On the Browser.So will use them by sending in the body
    // and storing them in the body

    const loggedInUser = {
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      refreshToken,
      accessToken,
    };
    console.log("first : ", loggedInUser);

    return res
      .status(200)
      .json(new apiResponse("User Logged in SuccessFully", 200, loggedInUser));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new apiErrors("Failed To log In", 500));
  }

  // end
});

//Start
const logoutUser = asyncWrapper(async (req, res) => {
  try {
    const user = req.user;

    const logoutUser = await User.findById(user._id);

    if (!user) {
      throw new apiErrors("User Not LoggedIn", 404);
    }

    logoutUser.refreshToken = undefined;

    logoutUser.save({ validateBeforeSave: false });

    res.status(204).json(new apiResponse("User Logged Out Successfully", 204));
  } catch (error) {
    console.error("Error : ", error);
  }
  // end
});

export { registerUser, loginUser, logoutUser };
