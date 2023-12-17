import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/app/lib/supabaseClient";

export async function GET() {
  return new Response("working");
}

export async function POST(req: Request) {
  const body = await req.json();
  const eventName = body.eventName;
  const userName = body.userName;

  const { data, error } = await supabase
    .from("Events")
    .insert([{ eventName: eventName }])
    .select()
    .then((eventResponse) => {
      const eventId = eventResponse.data?.[0]?.eventId ?? null;
      return supabase
        .from("Members")
        .insert([{ name: userName, eventId }])
        .select();
    });

  if (data) {
    const response: ApiResponse = {
      data: {
        eventName: data[0].eventName,
        eventId: data[0].eventId,
        memberId: data[0].memberId,
        memberName: data[0].name,
      },
      status: "ok",
      message: "Event created",
    };
    return new Response(JSON.stringify(response));
  } else {
    const response: ApiResponseERROR = {
      data: null,
      status: "error",
      message: error,
    };
    return new Response(JSON.stringify(response));
  }
}
