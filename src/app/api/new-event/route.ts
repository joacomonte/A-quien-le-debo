import {
  createErrorResponse,
  createSuccessResponse,
} from "../_helpers/functions";
import { createEvent, createMember } from "./functions";

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

  const { eventId, memberId, memberName } = memberResponse.data[0];
  const { eventName } = eventResponse.data[0];

  const data: EventAndMemberResponse = {
    eventName: eventName,
    eventId: eventId,
    memberId: memberId,
    memberName: memberName,
  };
  console.log(data);

  return createSuccessResponse<EventAndMemberResponse>(
    data,
    "ok",
    "Event and Member created successfuly",
  );
}
