const mongoose = require("mongoose");

const patienSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
   
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
    },
    passwordResetCode: {
        type: String,
      },
      passwordResetExpires: {
        type: Date,
      },
      password: {
        type: String,
        required: true,
      },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patienSchema);
module.exports = Patient;
