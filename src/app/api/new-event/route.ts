const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://montedb:montepass@cluster0.yr2c5ks.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //   await client.close();
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

export async function POST(req: Request) {
  if (!(await isMongoConnected())) {
    return new Response("MongoDB is not connected!");
  }

  const body = await req.json();

  try {
    const db = client.db("AQLD");

    const events = db.collection("events");

    const newEvent = {
      name: body.eventName,
      date: new Date(),
    };

    const result = await events.insertOne(newEvent);
    console.log(`A new event with ID ${result.insertedId} has been added.`);

    return new Response(
      JSON.stringify({
        eventName: body.eventName,
        eventId: result.insertedId,
        status: "ok",
        msg: "has been created",
      })
    );
  } catch {
    console.log("Collection already exists");
    return new Response(
      JSON.stringify({
        eventName: body.eventName,
        status: "error",
        msg: "Collection already exists",
      })
    );
  } finally {
    await client.close();
    console.log("termino la conexion");
  }
}
