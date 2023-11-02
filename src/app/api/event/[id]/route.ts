// import { NextRequest } from "next/server";

import { ObjectId } from "mongodb";

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

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

// Create a function to check the MongoDB connection status
const isMongoConnected = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export async function GET() {
  const data = {
    name: "john",
  };
  return new Response(JSON.stringify(data));
}

export async function POST(req: Request, params: any) {
  if (!(await isMongoConnected())) {
    return new Response("MongoDB is not connected!");
  }

  const db = client.db("AQLD");

  const events = db.collection("events");

  const {
    params: { id },
  } = params;

  const query = { _id: new ObjectId(id) };

  const result = await events.findOne(query);

  return new Response(JSON.stringify(result));
}
