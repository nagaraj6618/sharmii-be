const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require('dotenv').config();


const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "https://sharmii.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman / mobile

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// app.options("*", cors());

app.use(express.json());

// 📧 Email config
const email = "nagaraj516700@gmail.com";
const pass = process.env.EMAIL_PASS;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: pass,
  },
});

app.post("/send-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: email,
      to: email, // where you want to receive
      subject: "💖 She Clicked YES!",
      text: "Congratulations! She accepted your proposal 🎉",
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));