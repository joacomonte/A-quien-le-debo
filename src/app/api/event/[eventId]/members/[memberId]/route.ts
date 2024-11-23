import { createErrorResponse, createSuccessResponse } from '@/app/api/_utils/functions';
import { getMemberName } from '../functions';

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
