const express = require("express")
const router = express.Router();
const{createNewPatient, generateNewAccessToken, getCurrentPatient} = require("../../controllers/patients/patientControllers");
const {patientLogin, forgottenPassword, verifyAndUpdatepassword, logOutPatient} = require("../../controllers/patients/patientauthControllers")
const authenticateJWT = require("../../middlewares/patientMiddleware/authenticateJWT")

router.post("/auth/new-patient", createNewPatient)
router.post("/auth/login", patientLogin)
router.post("/auth/forgotten-password", forgottenPassword)
router.post("/auth/reset-password", verifyAndUpdatepassword)
router.post("/auth/logout", logOutPatient)
router.post("/token/access-token", generateNewAccessToken)
router.get("/current-patient", authenticateJWT, getCurrentPatient)


module.exports = router