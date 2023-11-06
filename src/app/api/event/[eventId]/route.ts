import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

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
  try {
    if (!(await isMongoConnected())) {
      return new Response("MongoDB is not connected!");
    }

    const events = await getEventsCollection();

    const { eventId } = params.params;

    const parsedId = { _id: new ObjectId(eventId) };

    const event = await events.findOne(parsedId);

    return new NextResponse(JSON.stringify(event));
  } catch {
    console.log("error");
  } finally {
    // await closeDB();
  }
}
