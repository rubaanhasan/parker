// mongo.js
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

const PreorderNumberplate = mongoose.model(
  "PreorderNumberplate",
  preorderNumberplateSchema
);
const LocalNumberplate = mongoose.model(
  "LocalNumberplate",
  localNumberplateSchema
);

module.exports = {
  PreorderNumberplate,
  LocalNumberplate,
};
