import { supabase } from "@/app/lib/supabaseClient";
import { createErrorResponse, createSuccessResponse } from "../../_utils/functions";

type Params = {
  params: {
    eventId: string;
  };
};

export async function GET(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;


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
