const express = require("express");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const {
  LogInCollection2,
  PreorderNumberplate,
  LocalNumberplate,
  ExitCollection,
  Prebook,
} = require("../models/mongodb");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");

// dotenv.config();

const publicPath = path.join(__dirname, "../../frontend/public/CSS");
const imagesPath = path.join(__dirname, "../../frontend/public/Images");
const faviconPath = path.join(__dirname, "../../frontend/public/favicon_io");
const jsPath = path.join(__dirname, "../../frontend/JS");

const port = 3000;
const app = express();
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cors());
app.set("view engine", "ejs"); // Set the view engine to EJS
app.set("views", path.join(__dirname, "../../frontend/views")); // Set the views directory
app.use(express.static(publicPath));
app.use(express.static(imagesPath));
app.use(express.static(faviconPath));
app.use(express.static(jsPath));

// Route for the success page
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/afterlogin", (req, res) => {
  res.render("afterlogin");
});
app.get("/ALabout", (req, res) => {
  res.render("ALabout");
});
app.get("/payment", (req, res) => {
  res.render("payment");
});
app.get("/user", (req, res) => {
  res.render("user");
});
// Route for the login page
app.get("/login", (req, res) => {
  res.render("login");
});

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

function timeStringToSeconds(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      name: "smtp.gmail.com",
      //service:"gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      //secureConnection: false,

      auth: {
        user: "esyntax247@gmail.com",
        pass: "bpnh quaj phwy mtro",
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject: "For Reset Password",
      html:
        "<p> Hii " +
        name +
        ', Please copy the link <a href="http://127.0.0.1:3000/api/reset-password?token=' +
        token +
        '"> and reset your password</a>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent:- ", info.response);
      }
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    return "";
  }
};

//check db
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const check = await LogInCollection2.findOne({ email: email });

    if (check) {
      const passwordMatch = await bcryptjs.compare(password, check.password);
      if (passwordMatch) {
        console.log("log");
        // res.status(201).render("afterlogin", {
        //   lodu: `${req.body.username}`,
        // });
        res.render("afterlogin", { username });
        // res.redirect("http://localhost:5500/afterlogin.html"); //redirecting home
      } else {
        // res.redirect("http://localhost:5500/login.html");
        res.status(200).json({ success: false, msg: "wrong password" });
      }
    } else {
      // res.redirect("http://localhost:5500/login.html"); //no email found that is new user have to redirect on signup
      res
        .status(200)
        .json({ success: false, msg: "Login details are incorrect" });
    }
  } catch (e) {
    // console.error("Error during signup:", err);
    // res.status(500).json({
    //   success: false,
    //   msg: "Error occurred during registration: " + err.message,
    // });
  }
});

// check db
app.post("/signup", async (req, res) => {
  try {
    console.log("Received data:", req.body); // Log the received data
    const spassword = await securePassword(req.body.password);
    if (spassword) {
      const data = {
        email: req.body.email,
        username: req.body.username,
        numberplate: req.body.numberplate,
        password: spassword,
      };

      console.log("Constructed data:", data); // Log the constructed data

      // Check if a user with the same email already exists
      const existingUser = await LogInCollection2.findOne({
        email: req.body.email,
      });

      console.log("Existing user:", existingUser); // Log the existing user

      if (existingUser) {
        res
          .status(200)
          .json({ success: false, msg: "This email is already in use." }); // Send error response
        // res
        //   .status(200)
        //   .send({ success: false, msg: "This email is already exist" });
      } else {
        await LogInCollection2.insertMany([data]);
        res.status(200).json({ success: true, msg: "Signup successful" });
        // res.status(200).send({ success: true, msg: "Signup successful" });
      }
    }
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({
      success: false,
      msg: "Error occurred during registration: " + err.message,
    });
  }
});

app.post("/forget-password", async (req, res) => {
  try {
    const email = req.body.email;
    const userData = await LogInCollection2.findOne({ email: email });

    if (userData) {
      const randomString = randomstring.generate();
      const data = await LogInCollection2.updateOne(
        { email: email },
        { $set: { token: randomString } }
      );
      sendResetPasswordMail(userData.name, userData.email, randomString);

      res.status(200).send({ success: true, msg: "Please check your email" });
    } else {
      res.status(200).send({ success: true, msg: "This email does not exist" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

app.post("/prebook", async (req, res) => {
  console.log("hi");
  const { InTime, OutTime, NumberPlate } = req.body;

  if (InTime && OutTime && NumberPlate) {
    try {
      // Calculate the time difference in seconds
      // const inTimeInSeconds = new Date(InTime).getTime() / 1000;
      // const outTimeInSeconds = new Date(OutTime).getTime() / 1000;
      const inTimeInSeconds = timeStringToSeconds(InTime);
      const outTimeInSeconds = timeStringToSeconds(OutTime);
      console.log("InTime:", inTimeInSeconds);
      console.log("OutTime:", outTimeInSeconds);

      if (!isNaN(inTimeInSeconds) && !isNaN(outTimeInSeconds)) {
        const durationInSeconds = outTimeInSeconds - inTimeInSeconds;

        // Calculate the payable amount based on the duration (2 Rs per second)
        const payableAmount = durationInSeconds * 2;

        // Save the data to the MongoDB database including the payable amount
        const prebookData = new Prebook({
          InTime,
          OutTime,
          NumberPlate,
          PayableAmount: payableAmount,
        });
        console.log(prebookData);
        await Prebook.insertMany([prebookData]);
        res.status(201).json({ message: "Data stored successfully" });
      } else {
        res.status(400).json({ message: "Invalid data" });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      res
        .status(500)
        .json({ message: "An error occurred while saving the data" });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
