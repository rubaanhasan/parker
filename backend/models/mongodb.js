const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://birhadedarshan212:ooad@ooad.tipepbx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongo connected");
  })
  .catch(() => {
    console.log("FAILED");
  });

const logInSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  numberplate: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: "",
  },
});

const exitSchema = new mongoose.Schema({
  numberplate: {
    type: String,
    required: true,
  },
  intime: {
    type: String,
    required: true,
  },
  outtime: {
    type: String,
    required: true,
  },
  payableAmount: {
    type: Number,
    required: true,
  },
});

const prebookSchema2 = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  InTime: {
    type: String,
    required: true,
  },
  OutTime: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  NumberPlate: {
    type: String,
    required: true,
  },
  PayableAmount: {
    type: Number, // Assuming it's a numeric field
    required: true, // You can adjust this as needed
  },
});

const prebookSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
  },
  inTimeInSeconds: {
    type: Number,
    required: true,
  },
  outTimeInSeconds: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  InTime: {
    type: String,
    required: true,
  },
  OutTime: {
    type: String,
    required: true,
  },
  NumberPlate: {
    type: String,
    required: true,
  },
  PayableAmount: {
    type: Number, // Assuming it's a numeric field
    required: true, // You can adjust this as needed
  },
});

const preorderNumberplateSchema = new mongoose.Schema({
  numberplate: {
    type: String,
    required: true,
  },
});

const localNumberplateSchema = new mongoose.Schema({
  numberplate: String,
  intimeInSeconds: String, // Store the intime as a string in "hh:mm:ss" format
});
const LogInCollection2 = mongoose.model("LogInCollection2", logInSchema);
const Prebook = mongoose.model("Prebook", prebookSchema);
const PrebookExited = mongoose.model("PrebookExited", prebookSchema2);
const ExitCollection = mongoose.model("ExitCollection", exitSchema);
const PreorderNumberplate = mongoose.model(
  "PreorderNumberplate",
  preorderNumberplateSchema
);
const LocalNumberplate = mongoose.model(
  "LocalNumberplate",
  localNumberplateSchema
);
module.exports = {
  Prebook,
  PrebookExited,
  LogInCollection2,
  ExitCollection,
  PreorderNumberplate,
  LocalNumberplate,
};
