import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateTokens = async (id) => {
   try {
      const user = await User.findById(id);

      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });

      return { accessToken, refreshToken };

   } catch (error) {
      throw new ApiError(
         500,
         "Something went wrong while generating referesh and access token"
      );
   }
};

const registeruser = asyncHandler(async (req, res) => {
   const { fullname, email, password } = req.body;

   if (!(fullname && email && password)) {
      throw new ApiError(401, "All feilds are Required");
   }

   const existedUser = await User.findOne({
      email,
   });

   if (existedUser) {
      throw new ApiError(409, "User with email already exists");
   }

   const user = await User.create({
      fullname,
      email,
      password,
   });

   const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
   );

   if (!createdUser) {
      throw new ApiError(
         500,
         "Something went wrong while registering the user"
      );
   }

   return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   if (!(email && password)) {
      throw new ApiError(401, "Email and Password is required");
   }

   const user = await User.findOne({ email });

   if (!user) {
      throw new ApiError(404, "user not Found");
   }

   const pc = await user.passwordheck(password);

   if (!pc) {
      throw new ApiError(401, "Password incorrect");
   }

   const { refreshToken, accessToken } = await generateTokens(user._id);


   const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
   );

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
            {
               user: loggedInUser,
               accessToken,
               refreshToken,
            },
            "User logged In Successfully"
         )
      );
});

const logoutUser = asyncHandler(async(req, res) => {
   await User.findByIdAndUpdate(
       req.user._id,
       {
           $unset: {
               refreshToken: 1
           }
       },
       {
           new: true
       }
   )

   const options = {
       httpOnly: true,
       secure: true
   }

   return res
   .status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json(new ApiResponse(200, {}, "User logged Out"))
})

const getCurrentUser = asyncHandler(async(req, res) => {
   return res
   .status(200)
   .json(new ApiResponse(
       200,
       req.user,
       "User fetched successfully"
   ))
})



export { registeruser, loginUser, logoutUser, getCurrentUser };
