const express = require("express");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
var engines = require("consolidate");
const Razorpay = require("razorpay");
const cons = require("consolidate");


const { countRecords } = require("../models/mongo");
const {
  LogInCollection2,
  PreorderNumberplate,
  LocalNumberplate,
  ExitCollection,
  Prebook,
  PrebookExited,
} = require("../models/mongodb");



const razorpayInstance = new Razorpay({
  key_id: "rzp_test_a1bgTfOzP7ZaC4",
  key_secret: "QDTr46VyzzsI5D0vCXztaJce",
});




const publicPath = path.join(__dirname, "../../frontend/public/CSS");
const imagesPath = path.join(__dirname, "../../frontend/public/Images");
const faviconPath = path.join(__dirname, "../../frontend/public/favicon_io");
const jsPath = path.join(__dirname, "../../frontend/JS");
var user;
var np;
var emu;
var gg;



const port = 3000;
const app = express();
var http = require("http").Server(app);
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
res.render("afterlogin", {
  username: `${user}`,
  email: `${emu}`,
  numberplate: `${np}`,
});

});


app.get("/ALabout", (req, res) => {
  res.render("ALabout", {
    username: `${user}`,
    email: `${emu}`,
    numberplate: `${np}`,
  });
});


app.get("/payment", (req, res) => {
  res.render("payment", {
    username: `${user}`,
    email: `${emu}`,
    numberplate: `${np}`,
  });
});


// Route for the login page
app.get("/login", (req, res) => {
  res.render("login");
});


app.get("/forget-password", (req, res) => {
  res.render("forget-password");
});


app.get("/view", (req, res) => {
  res.render("view");
});


app.get('/user', async (req, res) => {
  try {
    const records = await Prebook.find({ username: user, email: emu })
      .sort({ outTime: -1 }) // Sort by outTime in descending order
      .exec();
    console.log(records)
    const records2 = await PrebookExited.find({ username: user, email: emu })
    .sort({ outTime: -1 }) // Sort by outTime in descending order
    .exec();
    console.log(records2)
   
    // res.status(200).json(records);
    res.render("user", data = {
      records: records,
      records2:records2,
      username: `${user}`,
      email: `${emu}`,
      Date: `${Date}`,
      //   numberplate: `${np}`,
    });

  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});



// app.use("/afterlogin", paymentRoute);
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
    // res.status(400).send({ success: false, msg: error.message });
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
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const check = await LogInCollection2.findOne({ email: email });
    const username = check.username;
    const numberplate = check.numberplate;

    if (check) {
      const passwordMatch = await bcryptjs.compare(password, check.password);
      if (passwordMatch) {
        user = username;
        np = numberplate;
        emu = email;
        res.status(200).json({ success: true, msg: "Login success" });
      } else {
        res.status(200).json({ success: false, msg: "Wrong Password" });
      }
    } else {
      res
        .status(200)
        .json({ success: false, msg: "Login details are incorrect" });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      msg: "Login details are incorrect",
    });
  }
})

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

      res.status(200).send({ success: true, msg: "Reset link sent to your email" });
    } else {
      res.status(200).send({ success: false, msg: "This email does not exist" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});






const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://birhadedarshan212:ooad@ooad.tipepbx.mongodb.net/?retryWrites=true&w=majority";

app.post("/view", async (req, res) => {
  const client = new MongoClient(url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  const startTimeInSeconds = timeStringToSeconds(req.body.inTime); // Use req.body.obj.intime as startTimeInSeconds
  const endTimeInSeconds = timeStringToSeconds(req.body.outTime); // Use req.body.obj.endTime as endTimeInSeconds
  console.log(startTimeInSeconds)
  console.log(endTimeInSeconds)

  const dbName = "test"; // Include dbName directly
  const collectionName = "prebook"; // Include collectionName directly
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const count = await Prebook.countDocuments({

      $or: [
        {
          inTimeInSeconds: { $gte: startTimeInSeconds, $lte: endTimeInSeconds }, // Check if inTime is within the range
        },
        {
          outTimeInSeconds: { $gte: startTimeInSeconds, $lte: endTimeInSeconds }, // Check if exitTime is within the range
        },
        {
          inTimeInSeconds: { $lte: startTimeInSeconds },
          outTimeInSeconds: { $gte: endTimeInSeconds },
        },

      ],
    });
    console.log(`Number of records within the time range: ${count}`);
    ;
    const availableSpaces = 300 - count;
    gg = availableSpaces;
    res.status(200).json({
      success: true,
      msg: `Available slots: ${availableSpaces}`,
    });

  } catch (err) {
    console.error("Error: ", err);
    res.status(500).json({ error: "An error occurred during the operation." });
  } finally {
    client.close();
  }
});






app.post("/createOrder", async (req, res) => {

  if (gg) {

    const { username, email, Date, InTime, OutTime, NumberPlate } = req.body;

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
          var payableAmount = 0;

          if (durationInSeconds <= 3600) {
            payableAmount = 3000;
          }
          else if (durationInSeconds >= 54000) {
            payableAmount = 25000;
          }
          else if (durationInSeconds >= 36000) {
            payableAmount = 35000;
          }
          else {
            payableAmount = 30 + ((durationInSeconds - 3600) * 20) / 3600;
            payableAmount = Math.round(payableAmount) * 100
          }
          // Save the data to the MongoDB database including the payable amount
          const prebookData = new Prebook({
            username,
            email,
            Date,
            InTime,
            OutTime,
            inTimeInSeconds,
            outTimeInSeconds,
            NumberPlate,
            PayableAmount: payableAmount,
          });
          console.log(prebookData);
          await Prebook.insertMany([prebookData]);

          try {
            const amount = payableAmount;
            const options = {
              amount: amount,
              currency: "INR",
              receipt: "razorUser@gmail.com",
            };

            razorpayInstance.orders.create(options, (err, order) => {

              if (!err) {
                res.status(200).send({
                  success: true,
                  msg: "Order Created",
                  order_id: order.id,
                  amount: amount,

                  key_id: "rzp_test_a1bgTfOzP7ZaC4",
                  product_name: req.body.name,
                  description: req.body.description,
                  contact: "8567345632",
                  name: "Rubaan Hasan",
                  email: "rubaanhasan123@gmail.com",
                });
              } else {
                res
                  .status(400)
                  .send({ success: false, msg: "Something went wrong!" });
              }
            });
          } catch (error) {
            console.log(error.message);
          }
          // res.status(201).json({ message: "Data stored successfully" });
        } else {
          res.status(400).json({ message: "Invalid data" });
        }
      } catch (error) {
        console.error("Error :", error);
        res
          .status(500)
          .json({ message: "An error occurred while saving the data" });
      }
    }
  }
  else {
    res.status(200).send({
      success: false,
      msg: "cant prebook slots full\ncheck back at some other time",

    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
