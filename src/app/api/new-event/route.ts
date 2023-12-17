import {
  createEvent,
  createErrorResponse,
  createMember,
  createSuccessResponse,
} from "../_helpers/functions";

export async function GET() {
  return new Response("working");
}

export async function POST(req: Request) {
  const { eventName: inputEventName, userName } = await req.json();

  const eventResponse = await createEvent(inputEventName);
  if (eventResponse.error) {
    return createErrorResponse(eventResponse.error);
  }

  const memberResponse = await createMember(
    userName,
    eventResponse.data[0].eventId,
  );
  if (memberResponse.error) {
    return createErrorResponse(memberResponse.error);
  }

  const { eventId, memberId, name } = memberResponse.data[0];
  const { eventName } = eventResponse.data[0];

  const data: responseType = {
    eventName: eventName,
    eventId: eventId,
    memberId: memberId,
    memberName: name,
  };

  return createSuccessResponse<responseType>(
    data,
    memberResponse.status,
    memberResponse.statusText,
  );
}
