const MongoClient = require("mongodb").MongoClient;

// MongoDB Atlas connection URL
const url =
  "mongodb+srv://birhadedarshan212:ooad@ooad.tipepbx.mongodb.net/?retryWrites=true&w=majority";

// Name of the database and collection
const dbName = "test";
const collectionName = "prebook";

// Define the time range for in-time and exit-time in seconds
const startTimeInSeconds = 1541155200; // 08:00:00 on November 2, 2023
const endTimeInSeconds = 1541187200; // 18:00:00 on November 2, 2023

// Create a function to count the records
async function countRecords() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const count = await collection.countDocuments({
      $or: [
        {
          inTime: { $gte: startTimeInSeconds, $lte: endTimeInSeconds }, // Check if inTime is within the range
        },
        {
          exitTime: { $gte: startTimeInSeconds, $lte: endTimeInSeconds }, // Check if exitTime is within the range
        },
        {
          inTime: { $lte: startTimeInSeconds },
          exitTime: { $gte: endTimeInSeconds },
        },
      ],
    });

    console.log(`Number of records within the time range: ${count}`);
    
  } catch (err) {
    console.error("Error: ", err);
  } finally {
    client.close();
  }
}

module.exports = { countRecords };
