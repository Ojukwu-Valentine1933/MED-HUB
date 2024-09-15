const { JWT_SECRET } = require("../../config/dotEnv"); // Import JWT secret from environment configuration
const Patient = require("../../models/patientModel"); // Import Patient model
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const { generateWebToken } = require("../../helpers/jwtHelpers"); // Import helper function to generate JWT
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token verification

// Controller to create a new patient
const createNewPatient = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, confirmPassword } =
      req.body; // Destructure request body

    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new patient instance
    const newPatient = new Patient({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    // Generate salt and hash the password
    const hashPassword = await bcrypt.genSalt(10);
    newPatient.password = await bcrypt.hash(password, hashPassword);

    // Save the new patient to the database
    const savedPatient = await newPatient.save();

    // Respond with success message and patient details
    res.status(201).json({
      message: "Patient created successfully",
      user: {
        id: savedPatient._id,
        firstName: savedPatient.firstName,
        lastName: savedPatient.lastName,
        email: savedPatient.email,
        phoneNumber: savedPatient.phoneNumber,
      },
    });
  } catch (error) {
    // Handle errors and respond with failure message
    res.status(500).json({ message: "Failed to create patient" });
  }
};

// Controller to generate a new access token
const generateNewAccessToken = async (req, res) => {
  try {
    const headers = req.headers["authorization"]; // Get authorization headers
    if (!headers) {
      return res.status(403).json({ error: "Authorization headers missing" });
    }

    // Check if the token is a Bearer token
    if (headers.split(" ")[0] !== "Bearer") {
      return res.status(403).json({ error: "Invalid Token" });
    }

    const refreshToken = headers.split(" ")[1]; // Extract the refresh token

    // Verify the refresh token
    const payload = jwt.verify(refreshToken, JWT_SECRET);

    // Extract patient data from the token payload
    const patientData = {
      patientId: payload.patientId,
      email: payload.email,
    };

    // Generate a new access token
    const accessToken = generateWebToken(patientData, "1h", JWT_SECRET);
    if (!accessToken) {
      return res.status(500).json({ error: "Token generation failed" });
    }

    // Set cookie options for the access token
    const cookieOptions = {
      expires: new Date(Date.now() + 3600), // 1 month in milliseconds
      maxAge: 60 * 60 * 1000, // 1 hour
      httpOnly: true,
      sameSite: "none",
      secure: true, // Ensure secure cookies in production
    };

    // Respond with the new access token and set it as a cookie
    return res.cookie("accessToken", accessToken, cookieOptions).json({
      message: "New access token generated successfully",
      accessToken,
    });
  } catch (error) {
    // Handle token expiration error
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ error: "Token expired, please login again" });
    }
    // Log and respond with a generic error message
    console.log(error);
    return res
      .status(500)
      .json({ error: "Failed to generate new access token" });
  }
};

const getCurrentPatient = async (req, res) => {
  try {
    const { patientId } = req.patient;
    const patient = await Patient.findById(patientId).select("-password");

    if (!patient) {
      console.log(`Patient with ID ${patientId} not found`); // Log the problem
      return res.status(404).json({ error: "Patient not found" });
    }
    return res.status(200).json({ patient });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "failed to get patient" });
  }
};

module.exports = { createNewPatient, generateNewAccessToken, getCurrentPatient }; // Export the controllers
