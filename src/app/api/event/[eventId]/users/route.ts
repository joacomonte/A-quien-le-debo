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
  if (!(await isMongoConnected())) {
    return new Response("MongoDB is not connected!");
  }

  // const body = await req.json();

  try {
    const events = await getEventsCollection();
    const { eventId } = params.params;

    const parsedId = { _id: new ObjectId(eventId) };

    const event = await events.findOne(parsedId);

    const allUsers = event.users;

    await closeDB();

    return new Response(
      JSON.stringify({
        data: { users: allUsers },
        status: "ok",
        msg: "response with only the users names",
      })
    );
  } catch (err) {
    console.log("Database request error:", err);
    return new Response(
      JSON.stringify({
        status: "error",
        msg: "Database request error",
      })
    );
  }
}
