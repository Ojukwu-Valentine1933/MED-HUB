const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()
const patientRoute = require("./routes/patientRoutes/patientRoute")

const corsOption = {
    origin: "https://med-hub-tau.vercel.app/",
    credentials: true,
}

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());


try {
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to the server" })
    })
} catch (error) {
    console.log(error)
}

app.use("/patient", patientRoute)


module.exports = app