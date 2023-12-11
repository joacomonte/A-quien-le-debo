import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/lib/supabaseClient";

export async function GET() {
  return new Response("working");
}

export async function POST(req: Request) {
  // try {

  const body = await req.json();
  console.log(body.eventName);

  return new Response(
    JSON.stringify({
      eventName: body.eventName,
      status: "error",
      msg: "Database request error",
    }),
  );

  // Insert new event into Supabase
  //   const { data, error } = await supabase
  //     .from("Events")
  //     .insert([{ event_name: eventName }]);

  //   if (error) throw error;

  // return res.status(200).json(data);
  // } catch (error) {
  //   return res.status(500).json({ error: error.message });
  // }
}
