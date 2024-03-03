import { Employee } from "../models/employee.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
   deleteCloudinaryImage,
   uploadOnCloudinary,
} from "../utils/cloudinary.js";

const createEmployee = asyncHandler(async (req, res) => {
   const { fullname, email, mobileNumber, designation, gender, course } =
      req.body;

   if (!(fullname && email && mobileNumber)) {
      throw new ApiError(401, "All feilds are Required");
   }
   const desig = ["HR", "Manager", "Sales"];
   if (!desig.includes(designation)) {
      throw new ApiError(401, "Desigination is Required");
   }
   const courselist = ["MCA", "BCA", "BSC"];
   if (!courselist.includes(course)) {
      throw new ApiError(401, "course is Required");
   }
   const genderAllowed = ["male", "female"];
   if (!genderAllowed.includes(gender)) {
      throw new ApiError(401, "gender is Required");
   }

   const existedUser = await Employee.findOne({
      $or: [{ email }, { mobileNumber }],
   });

   if (existedUser) {
      throw new ApiError(
         409,
         "User with email or Mobile Number already exists"
      );
   }

   const avatarLocalPath = req.files?.avatar[0]?.path;

   if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath);

   if (!avatar) {
      throw new ApiError(400, "Avatar file upload failed");
   }

   const employee = await Employee.create({
      fullname,
      email,
      mobileNumber,
      designation,
      gender,
      course,
      avatar: avatar.secure_url,
   });

   const createdEmployee = await Employee.findById(employee._id);

   if (!createdEmployee) {
      throw new ApiError(
         500,
         "Something went wrong while registering the user"
      );
   }

   return res
      .status(201)
      .json(
         new ApiResponse(
            200,
            createdEmployee,
            "Employee registered Successfully"
         )
      );
});

const editEmployee = asyncHandler(async (req, res) => {
   const { id, fullname, email, mobileNumber, designation, gender, course } =
      req.body;

   if (!(id && fullname && email && mobileNumber)) {
      throw new ApiError(401, "All feilds are Required");
   }
   const desig = ["HR", "Manager", "Sales"];
   if (!desig.includes(designation)) {
      throw new ApiError(401, "Desigination is Required");
   }
   const courselist = ["MCA", "BCA", "BSC"];
   if (!courselist.includes(course)) {
      throw new ApiError(401, "course is Required");
   }
   const genderAllowed = ["male", "female"];
   if (!genderAllowed.includes(gender)) {
      throw new ApiError(401, "gender is Required");
   }

   const avatarLocalPath = req.files?.avatar[0]?.path;

   if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
   }

   const avatar = await uploadOnCloudinary(avatarLocalPath);
   if (!avatar) {
      throw new ApiError(400, "Avatar file is required");
   }

   const employeedata = await Employee.findByIdAndUpdate(id);

   const deleteimg = await deleteCloudinaryImage(employeedata.avatar);

   const employee = await Employee.findByIdAndUpdate(
      id,
      {
         $set: {
            fullname,
            email,
            mobileNumber,
            designation,
            gender,
            course,
            avatar: avatar.secure_url,
         },
      },
      { new: true }
   );

   return res
      .status(201)
      .json(new ApiResponse(200, employee, "Employee updated Successfully"));
});

const deleteEmployee = asyncHandler(async (req, res) => {
   const { id } = req.body;
   if (!id) {
      throw new ApiError(401, "employee id is required");
   }

   const r = await Employee.findByIdAndDelete(id);
   if (!r) {
      throw new ApiError(401, "no Employee Found");
   }
   return res
      .status(200)
      .json(new ApiResponse(200, {}, "Employee deleted successfully"));
});

const allEmployee = asyncHandler(async (req, res) => {
   const employee = await Employee.find();

   if (!employee) {
      throw new ApiError(500, "cannot get emplayee list");
   }
   return res
      .status(200)
      .json(new ApiResponse(200, employee, "Employee fetched successfully"));
});

const employee = asyncHandler(async (req, res) => {
   const { id } = req.body;

   if (!id) {
      throw new ApiError(401, "Name is required");
   }

   const employee = await Employee.findById(id);

   if (!employee) {
      throw new ApiError(500, "cannot find employee");
   }

   return res
      .status(200)
      .json(new ApiResponse(200, employee, "User fetched successfully"));
});

const Findemployees = asyncHandler(async (req, res) => {
   const { fullname } = req.body;

   if (!fullname) {
      throw new ApiError(401, "Name is required");
   }

   const employee = await Employee.find({
      fullname: { $regex: fullname, $options: "i" },
   });

   if (!employee) {
      throw new ApiError(500, "cannot find employee");
   }

   return res
      .status(200)
      .json(new ApiResponse(200, employee, "User fetched successfully"));
});

export { createEmployee, editEmployee, deleteEmployee, employee, allEmployee, Findemployees };
