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

export async function GET(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const allMembersResponse = await getAllMembers(eventId);

  if (allMembersResponse.error)
    return createErrorResponse(allMembersResponse.error);

  const data: Member[] = allMembersResponse.data.map((member) => ({
    memberId: member.memberId,
    memberName: member.memberName,
  }));

  return createSuccessResponse(data, "OK");
}

export async function POST(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const { memberName } = await request.json();

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

export async function DELETE(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const { memberId } = await request.json();
  const deleteMemberResponse = await removeMember(eventId, memberId);

  return createSuccessResponse(
    deleteMemberResponse,
    deleteMemberResponse.statusText,
  );
}
