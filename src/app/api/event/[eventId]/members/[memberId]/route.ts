import { createErrorResponse, createSuccessResponse } from "@/app/api/_utils/functions";
import { getMemberName } from "../functions";


type Params = {
  params: {
    eventId: string;
    memberId: string;
  };
};


export async function GET(request: Request, params: Params) {
  const { eventId, memberId } = params.params;

  console.log("Request URL:", request.url);
  console.log("eventId:", eventId);
  console.log("memberId:", memberId);
  // If memberId is provided, fetch the member name
  if (memberId) {
    const { memberName, error } = await getMemberName(eventId, parseInt(memberId));
    if (error) {
      return createErrorResponse(error);
    }
    return createSuccessResponse(memberName, "OK");
  }

  // If memberId is not provided, return an error
  return createErrorResponse("memberId is required");
}