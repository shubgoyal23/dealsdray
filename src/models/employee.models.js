import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
   {
      fullname: {
         type: String,
         lowercase: true,
         required: true,
         index: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         validate: {
            validator: function (v) {
               return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                  v
               );
            },
            message: (props) => `${props.value} is not a valid email address!`,
         },
      },
      mobileNumber: {
         type: String,
         required: true,
         validate: {
            validator: function (v) {
               return /^\d{10}$/.test(v);
            },
            message: (props) =>
               `${props.value} is not a valid phone number! Must be exactly 10 digits.`,
         },
      },
      designation: {
         type: String,
         required: true,
      },
      gender: {
         type: String,
         required: true,
      },
      course: {
         type: String,
         required: true,
      },
      avatar: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

export const Employee = mongoose.model("Employee", EmployeeSchema);
