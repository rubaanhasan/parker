const Razorpay = require("razorpay");
const fs = require("fs");
const {
  PreorderNumberplate,
  LocalNumberplate,
  ExitCollection,
  Prebook,
  PrebookExited,
} = require("../models/mongodb");
const { countRecords } = require("../models/mongo");
const express = require("express");
const app2 = require("express")();
var http = require("http").Server(app2);
var engines = require("consolidate");
const path = require("path");
var HAHAH=0
// app.set('views', __dirname + '/views');
// app.engine('html', engines.mustache);
app2.set("view engine", "ejs");
app2.set("views", path.join(__dirname, "../../frontend/views"));
app2.get("/", (req, res) => {
  res.render("exitpayment");
});

function submitform(){
  document.getElementById("submitButtonexit").click();
}
// Global variables
const PORT = 4000;
let localNumberplatesCount = 0;
let onlylocalNumberplatesCount = 0; // Declare as a global variable
const PARKING_CAPACITY = 100;
const razorpayInstance = new Razorpay({
  key_id: "rzp_test_a1bgTfOzP7ZaC4",
  key_secret: "QDTr46VyzzsI5D0vCXztaJce",
});

// Flag to prevent multiple executions when the file changes
let isProcessing = false;
// const app = express();

// Function to convert "hh:mm:ss" time string to seconds
function timeStringToSeconds(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

// Function to count local number plates in the database
async function countLocalNumberplates() {
  try {
    localNumberplatesCount = await LocalNumberplate.countDocuments();
    console.log(
      `Number of number plates stored in local_numberplate: ${localNumberplatesCount}`
    );
  } catch (error) {
    console.error("Error counting number plates:", error);
  }
}

// Function to count local number plates without printing
async function onlycountLocalNumberplates() {
  try {
    onlylocalNumberplatesCount = await LocalNumberplate.countDocuments();
    return onlylocalNumberplatesCount; // Return the count
  } catch (error) {
    console.error("Error counting number plates:", error);
  }
}

// Function to process file data
app2.get("/triggerBackendOperation", async (req, res) => {
  try {
    // Call the backend controller function
    await performBackendOperation();
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred during the backend operation.",
    });
  }
});
function performBackendOperation() {
  return new Promise((resolve, reject) => {
    {
      setTimeout(() => {
        console.log("Backend operation completed.");
        resolve();
      }, 2);
    }
  });
}
async function processFileData(data) {
  // Set the flag to indicate that processing is in progress
  isProcessing = true;

  const lines = data.split("\n");

  const secondLine = lines[1].trim();

  if (secondLine === "camera1") {
    const numberplate = lines[0].trim();
    const NumberPlate = lines[0].trim();
    const intimeStr = lines[2].trim();
    const intimeInSeconds = timeStringToSeconds(intimeStr);
    console.log(numberplate);
    console.log(intimeStr);
    console.log(intimeInSeconds);

   
    try {
      // Check if the numberplate exists in the 'preorder_numberplate' collection
      const preorderResult = await Prebook.findOne({
        NumberPlate,
      }).exec();

      if (preorderResult) {
        console.log("Gate opens, prebooked car");
      } else {
        // Check if the numberplate exists in the 'local_numberplate' collection
        const existingLocalPlate = await LocalNumberplate.findOne({
          numberplate,
        }).exec();

        if (existingLocalPlate) {
          console.log("Car is already inside the parking space.");
        } else {
          // Call the function to count local number plates without printing
          const count = await onlycountLocalNumberplates();
          console.log(count);

          if (count < PARKING_CAPACITY) {
            // Insert the data into the 'local_numberplate' collection
            const localNumberplate = new LocalNumberplate({
              numberplate,
              intimeInSeconds,
            });
            await localNumberplate.save();
            console.log("Data saved to local_numberplate and entry gate opens");
            countLocalNumberplates();
          } else {
            console.log("Parking full, cannot store more data.");
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else if (secondLine === "camera2") {
    const numberplate = lines[0].trim();
    const NumberPlate = lines[0].trim();
    const outtimeStr = lines[2].trim();

    try {
      // Check if the numberplate exists in the 'preorder_numberplate' collection
      const preorderResult = await Prebook.findOne({
        NumberPlate,
      }).exec();
      

      if (preorderResult) {
        const n_intime=preorderResult.InTime;
        const n_paid_amt=preorderResult.PayableAmount;
        const n_username=preorderResult.username;
        const n_email=preorderResult.email;
        const n_date=preorderResult.Date;
        // Numberplate found in prebook collection, perform some action
        console.log("Open Gate. coz prebooked car");
        const exitDataPrebook = new PrebookExited({
          username:n_username,
          email:n_email,
          Date:n_date,
          NumberPlate:NumberPlate,
          InTime: n_intime,
          OutTime: outtimeStr,
          PayableAmount:n_paid_amt,
        });
        await exitDataPrebook.save();
        await Prebook.deleteOne({ NumberPlate });
      } else {
        // Numberplate not in prebook collection, proceed with exit logic
        const localPlate = await LocalNumberplate.findOne({
          numberplate,
        }).exec();

        if (localPlate) {
          // Get intime from local numberplate collection
          const intimeInSeconds = localPlate.intimeInSeconds;

          // Calculate the payable amount
          const outtimeInSeconds = timeStringToSeconds(outtimeStr);
          const durationInSeconds = outtimeInSeconds - intimeInSeconds;
          
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
              payableAmount = Math.round(payableAmount) * 100;}
          HAHAH=payableAmount;
          //exitpayment here
          
          // submitform();
           

          // Create an entry in the "exit collection"
          const exitData = new ExitCollection({
            numberplate,
            intime: localPlate.intimeInSeconds,
            outtime: outtimeStr,
            payableAmount,
          });
          await exitData.save();

          // Remove the data from local_numberplate collection
          await LocalNumberplate.deleteOne({ numberplate });

          console.log("Data stored in exit collection. Local data removed.");
        } else {
          console.log("Numberplate not found in local_numberplate collection.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Clear the flag to allow further executions
  isProcessing = false;
}

app2.post("/createexitOrder", async (req, res) => {
  console.log(HAHAH);
  try {
    const amount = HAHAH ;
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
          //product_name:req.body.name,
          // description:req.body.description,
          contact: "8567345632",
          name: "Rubaan Hasan",
          email: "rubaanhasan123@gmail.com",
        });
      } else {
        res.status(400).send({ success: false, msg: "Something went wrong!" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

function watchFile() {
  let isFileBeingProcessed = false;

  fs.watch("../../anpr/myfile.txt", (event, filename) => {
    if (event === "change" && filename === "myfile.txt" && !isFileBeingProcessed) {
      isFileBeingProcessed = true;

      console.log("File 'myfile.txt' has changed. Rerunning the code...");

      setTimeout(() => {
        fs.readFile("../../anpr/myfile.txt", "utf8", async (err, data) => {
          if (err) {
            console.error("Error reading the file:", err);
          } else {
            await processFileData(data); // Call the processing function
          }

          isFileBeingProcessed = false; // Reset the flag after processing
        });
      }, 1000); // Introduce a delay before reading the file
    }
  });
}


// Initial run to start watching the file
watchFile();

module.exports = { localNumberplatesCount };

app2.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
