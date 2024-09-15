const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const Patient = require("../../models/patientModel"); // Import Patient model
const { generateWebToken } = require("../../helpers/jwtHelpers"); // Import helper function to generate JWT
const { JWT_SECRET } = require("../../config/dotEnv"); // Import JWT secret from environment configuration
const emailRecoveryTokenGenerator = require("../../helpers/passwordRecoveryToken"); // Import helper function to generate password recovery token
const transport = require("../../smtTransport/smtpServer"); // Import SMTP transport for sending emails
const { USER_EMAIL } = require("../../config/dotEnv"); // Import user email from environment configuration

// Controller to handle patient login
const patientLogin = async (req, res) => {
  try {
    const { email, password } = req.body; // Destructure request body

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "All input field are required" });
    }

    // Check if patient exists with the provided email
    const patientExist = await Patient.findOne({ email });

    if (!patientExist) {
      return res.status(400).json({ error: "User with this email does not exist" });
    }

    // Compare provided password with the stored hashed password
    const passwordMatch = bcrypt.compareSync(password, patientExist.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    } else {
      // Create JWT payload
      const jwtPayload = {
        patientId: patientExist._id.toString(),
        email: patientExist.email,
      };

      // Generate access and refresh tokens
      const accessToken = generateWebToken(jwtPayload, "1h", JWT_SECRET);
      const refreshToken = generateWebToken(jwtPayload, "7d", JWT_SECRET);

      // Set cookie options for the access token
      const cookieOptions = {
        expires: new Date(Date.now() + 3600),
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
      };

      // Respond with success message, set access token as a cookie, and return refresh token
      return res.cookie("accessToken", accessToken, cookieOptions).json({ message: "Login Successful", refreshToken });
    }
  } catch (error) {
    console.log("Error during Login", error); // Log error
    return res.status(500).json({ error: "Login Failed" }); // Respond with failure message
  }
};

// Controller to handle forgotten password
const forgottenPassword = async (req, res) => {
  try {
    const { email } = req.body; // Destructure request body

    // Ensure the email is passed as a string
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: "Input a valid user email" });
    }

    // Check if patient exists with the provided email
    const checkEmailExistence = await Patient.findOne({ email });
    if (!checkEmailExistence) {
      return res.status(400).json({ error: "No user with this email found" });
    } else {
      // Generate recovery code
      const recoveryCode = emailRecoveryTokenGenerator().toString().trim();
      console.log("Generated 6-digit code:", recoveryCode);

      // Set recovery code and expiration time
      checkEmailExistence.passwordResetCode = recoveryCode;
      checkEmailExistence.passwordResetExpires = Date.now() + 3600000; // 1 hour expiration
      await checkEmailExistence.save();

      // Set email options
      const mailOptions = {
        from: USER_EMAIL,
        to: email,
        subject: "Password Recovery Token",
        html: `<h3>This is the token for your password recovery, don't disclose to anyone: ${recoveryCode}</h3>`,
      };

      try {
        // Send recovery email
        await transport.sendMail(mailOptions);
        return res.status(200).json({ message: "Recovery code sent to email" });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        return res.status(500).json({ error: "Error sending email" });
      }
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Error sending recovery code" });
  }
};


// Controller to verify and update password
const verifyAndUpdatepassword = async (req, res) => {
  try {
    const { passwordResetCode, password, confirmPassword } = req.body; // Destructure request body

    // Check if all required fields are provided
    if (!passwordResetCode || !password || !confirmPassword) {
      return res.status(400).json({ error: "All input field are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password do not match" });
    } else {
      // Find patient by password reset code
      const patient = await Patient.findOne({ passwordResetCode: passwordResetCode });
      if (!patient) {
        return res.status(403).json({ error: "Invalid password reset code" });
      }

      // Check if password reset code has expired
      if (patient.passwordResetExpires < Date.now()) {
        patient.passwordResetCode = null;
        patient.passwordResetExpires = null;
        await patient.save();
        return res.status(403).json({ error: "Token expired" });
      }

      // Generate salt and hash the new password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Update patient's password and clear reset code and expiration time
      patient.password = hashedPassword;
      patient.passwordResetCode = null;
      patient.passwordResetExpires = null;
      await patient.save();

      return res.status(200).json({ message: "Password reset successful" }); // Respond with success message
    }
  } catch (error) {
    console.log("Error during password reset", error); // Log error
    return res.status(500).json({ erro: "internal Server error" }); // Respond with failure message
  }
};

// Controller to handle patient logout
const logOutPatient = async(req, res) => {
  try {
    return res.clearCookie("accessToken").json({message: "logged out successfully"}); // Clear access token cookie and respond with success message
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"}); // Respond with failure message
  }
}

module.exports = { patientLogin, forgottenPassword, verifyAndUpdatepassword, logOutPatient }; // Export the controllers