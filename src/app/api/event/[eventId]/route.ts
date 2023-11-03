import { ObjectId } from "mongodb";

const {
  closeDB,
  isMongoConnected,
  getEventsCollection,
  run,
} = require("@/app/lib/db");

run().catch((error: any) => console.error("Error occurred: ", error));

export async function GET() {
  const data = {
    name: "john",
  };
  return new Response(JSON.stringify(data));
}

export async function POST(req: Request, params: any) {
  console.log("my params: ", params);
  if (!(await isMongoConnected())) {
    return new Response("MongoDB is not connected!");
  }

  const events = await getEventsCollection();

  const parsedId = { _id: new ObjectId(params.eventId) };

  const event = await events.findOne(parsedId);

  console.log("this event", event);

  return new Response(JSON.stringify(event));
}
