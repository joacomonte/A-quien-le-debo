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

    if (event) {
      const users = {
        user1: "teti",
      };

      event.users = users;

      const updateResult = await events.updateOne(parsedId, { $set: event });

      console.log("Update Result:", updateResult);

      if (updateResult?.matchedCount > 0)
        return new Response(
          JSON.stringify({
            status: "error",
            msg: "User already exists",
          })
        );
    }
  } catch {
    console.log("Database request error");
    return new Response(
      JSON.stringify({
        status: "error",
        msg: "Database request error",
      })
    );
  } finally {
    await closeDB();
  }
}
