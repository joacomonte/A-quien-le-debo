import { supabase } from "@/app/lib/supabaseClient";

export async function createEvent(eventName: string) {
  return await supabase.from("Events").insert([{ eventName }]).select();
}

export async function createMember(userName: string, eventId: number | null) {
  return await supabase
    .from("Members")
    .insert([{ name: userName, eventId }])
    .select();
}

export function createErrorResponse(errorMessage: PostgrestError) {
  const response: ApiResponseERROR = {
    data: null,
    status: "error",
    message: errorMessage,
  };
  return new Response(JSON.stringify(response));
}

// Function to create a success response
export function createSuccessResponse<DataType>(
  data: DataType,
  status: number,
  message: string,
): Response {
  const response: ApiResponse<DataType> = {
    data: data,
    status: `ok - ${status}`,
    message: message,
  };
  console.log("data sended", response);

  return new Response(JSON.stringify(response));
}
