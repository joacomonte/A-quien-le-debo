import { createErrorResponse, createSuccessResponse } from '@/app/api/_utils/functions';
import { getMemberName, updateMemberName } from '../functions';

type Params = {
  params: {
    eventId: string;
    memberId: string;
  };
};

export async function GET(request: Request, { params }: { params: Promise<{ eventId: string; memberId: string }> }) {
  const { eventId, memberId } = await params;

  if (memberId) {
    const { memberName, error } = await getMemberName(eventId, parseInt(memberId));
    if (error) {
      return createErrorResponse(error);
    }
    return createSuccessResponse(memberName, 'OK');
  }
  return createErrorResponse('memberId is required');
}

export async function PUT(request: Request, { params }: Params) {
  const { eventId, memberId } = params;

  // Get the new member name from the request body
  const { newName } = await request.json();

  // Update the member name
  const { success, error } = await updateMemberName(eventId, parseInt(memberId), newName);

  if (error) {
    return createErrorResponse(error);
  }

  return createSuccessResponse({ success }, 'Member name updated successfully');
}