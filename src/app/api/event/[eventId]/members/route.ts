import {
  createErrorResponse,
  createSuccessResponse,
} from "../../../_helpers/functions";
import { addMember, getAllMembers, removeMember } from "./functions";

type Params = {
  params: {
    eventId: string;
  };
};

export async function GET(request: Request, params: Params) {
  const { eventId } = params.params;
  const allMembersResponse = await getAllMembers(eventId);
  if (allMembersResponse.error) {
    return createErrorResponse(allMembersResponse.error);
  }
  const data: Member[] = allMembersResponse.data.map((member) => ({
    memberId: member.memberId,
    memberName: member.memberName,
  }));
  return createSuccessResponse(data, "ok", "ok");
}

export async function POST(req: Request, params: Params) {
  const { memberName } = await req.json();
  const { eventId } = params.params;
  const addMemberResponse = await addMember(eventId, memberName);
  console.log(memberName);
  console.log(eventId);
  console.log(addMemberResponse);

  return createSuccessResponse(addMemberResponse, "ok", "ok");
}

export async function DELETE(req: Request, params: Params) {
  const { memberId } = await req.json();
  const { eventId } = params.params;
  const deleteMemberResponse = await removeMember(eventId, memberId);
  console.log(memberId);
  console.log(eventId);
  console.log(deleteMemberResponse);

  return createSuccessResponse(deleteMemberResponse, "ok", "ok");
}
