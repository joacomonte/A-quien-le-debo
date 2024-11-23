import { supabase } from "@/app/lib/supabaseClient";
import { createErrorResponse, createSuccessResponse } from "../../_utils/functions";

type Params = {
  params: {
    eventId: string;
  };
};

export async function GET(request: Request, params: Params) {
  const { eventId } = await params.params

  const { data, error } = await supabase
    .from('Events')
    .select('eventName')
    .eq('eventId', eventId)
    .single()

  if (error) {
    return createErrorResponse(error);
  }
  
  return createSuccessResponse(data.eventName, "OK");
}

// export async function POST(req: Request, params: any) {
//   try {
//     if (!(await isMongoConnected())) {
//       return new Response("MongoDB is not connected!");
//     }

//     const events = await getEventsCollection();

//     const { eventId } = params.params;

//     const parsedId = { _id: new ObjectId(eventId) };

//     const event = await events.findOne(parsedId);

//     return new Response(JSON.stringify(event));
//   } catch {
//     console.log("error");
//   }
// }
