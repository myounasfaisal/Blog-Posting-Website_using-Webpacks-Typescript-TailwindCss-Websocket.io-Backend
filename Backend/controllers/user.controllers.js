import { User } from "../models/user.model.js";
import { apiErrors } from "../utils/apiErrors.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { uploadOnCloudinary } from "../utils/fileUpload(Cloudinary).js";

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

    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      throw new apiErrors("User Already Exists", 405);
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
    return res
      .status(500)
      .json(new apiErrors("Failed To Register" || error.message, 500));
  }

  //end
});

//start
const loginUser = asyncWrapper(async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if ([usernameOrEmail, password].some((field) => field?.trim() == "")) {
      throw new apiErrors("Username or Email is required", 405);
    }

    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).select("-refreshToken");

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
      _id: user._id,
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

const getUserDetails = asyncWrapper(async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new apiErrors("User ID is required", 400);
    }

    const user = await User.findById(id).select("-password -refreshToken");
    if (!user) {
      throw new apiErrors("User Not Found", 404);
    }

    res.status(200).json(new apiResponse("User Found", 200, user));
  } catch (error) {
    console.error(error);
  }
});

const updateUserProfile = asyncWrapper(async (req, res) => {
  try {
    // Ensure the user is authenticated
    const { user } = req;
    if (!user) throw new apiErrors("User not authenticated", 401);

    // Create an object to store the updated user data
    const updatedData = { ...req.body };

    // Check if there's an avatar file and process it
    if (req.file) {
      // Assuming req.file contains the uploaded avatar file
      const result = await uploadOnCloudinary(req.file.path); // Use req.file.path or similar
      updatedData.avatar = result.url;
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(user.id, updatedData, {
      new: true,
      runValidators: true,
    });

    // Handle the case where user update fails
    if (!updatedUser) throw new apiErrors("Failed to update user", 500);

    // Send the response with the updated user data
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json(new apiErrors("Failed to update user", 500));
  }
});

const updatePassword = asyncWrapper(async (req, res) => {
  try {
  } catch (error) {
    console.error("Error : ", error);
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updateUserProfile,
};
