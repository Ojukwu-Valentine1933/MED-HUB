const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const app = express()
const patientRoute = require("./routes/patientRoutes/patientRoute")

const allowedOrigins = ['https://med-hub-tau.vercel.app', 'http://localhost:3000']; // Add other origins if needed

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // This allows cookies and other credentials to be sent
}));

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