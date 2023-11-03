const {
  closeDB,
  isMongoConnected,
  getEventsCollection,
  run,
} = require("@/app/lib/db");

run().catch((error: any) => console.error("Error occurred: ", error));

export async function GET() {
  return new Response("working");
}

export async function POST(req: Request) {
  if (!(await isMongoConnected())) {
    return new Response("MongoDB is not connected!");
  }

  const body = await req.json();

  try {
    const events = await getEventsCollection();

    const newEvent = {
      name: body.eventName,
      date: new Date(),
    };

    const dbResponse = await events.insertOne(newEvent);

    console.log(`A new event with ID ${dbResponse.insertedId} has been added.`);

    return new Response(
      JSON.stringify({
        eventName: body.eventName,
        eventId: dbResponse.insertedId,
        status: "ok",
        msg: "Event created succesfully",
      })
    );
  } catch {
    console.log("Database request error");
    return new Response(
      JSON.stringify({
        eventName: body.eventName,
        status: "error",
        msg: "Database request error",
      })
    );
  } finally {
    await closeDB();
  }
}
