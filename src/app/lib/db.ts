const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://montedb:montepass@cluster0.yr2c5ks.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function run() {
  try {
    await connectDB();
  } catch {
    console.log("error al conectar");
  }
}

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

const closeDB = async () => {
  try {
    await client.close();
    console.log("Disconnected from MongoDB!");
  } catch (error) {
    console.error("Error disconnecting from MongoDB: ", error);
  }
};

// Create a function to check the MongoDB connection status
const isMongoConnected = async () => {
  try {
    // await client.connect();
    await client.db("admin").command({ ping: 1 });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getEventsCollection = async () => {
  try {
    await connectDB();
    const db = client.db("AQLD");
    const collection = db.collection("events");
    return collection;
  } catch (error) {
    console.log("Error getting collection: ", error);
    return null;
  }
};

module.exports = {
  client,
  closeDB,
  isMongoConnected,
  getEventsCollection,
  run,
};
