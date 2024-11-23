import { validateMemberName } from "@/app/api/_utils/validations";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../../../_utils/functions";
import { addMember, getAllMembers, removeMember } from "./functions";

type Params = {
  params: {
    eventId: string;
  };
};

export async function GET(request: Request, params: Params) {
  const { eventId } = await params.params;
  const allMembersResponse = await getAllMembers(eventId);

  if (allMembersResponse.error)
    return createErrorResponse(allMembersResponse.error);

  const data: Member[] = allMembersResponse.data.map((member) => ({
    memberId: member.memberId,
    memberName: member.memberName,
  }));

  return createSuccessResponse(data, "OK");
}

export async function POST(req: Request, params: Params) {
  const { eventId } = params.params;
  const { memberName } = await req.json();

  const validationError = validateMemberName(memberName);

  if (validationError) return createErrorResponse(validationError);
  if (eventId === null) return createErrorResponse("Event ID is required");

  try {
    const addMemberResponse = await addMember(eventId, memberName);

    if (addMemberResponse?.error) {
      return createErrorResponse(addMemberResponse.error);
    }

    return createSuccessResponse(addMemberResponse, "OK");
  } catch (error) {
    console.error("An error occurred:", error);
    return createErrorResponse(error);
  }
}

export async function DELETE(req: Request, params: Params) {
  const { memberId } = await req.json();
  const { eventId } = params.params;
  const deleteMemberResponse = await removeMember(eventId, memberId);

  return createSuccessResponse(
    deleteMemberResponse,
    deleteMemberResponse.statusText,
  );
}
