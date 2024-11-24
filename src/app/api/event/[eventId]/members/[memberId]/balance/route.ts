import { createSuccessResponse } from '@/app/api/_utils/functions';
import { getMemberBalance } from './functions';

export async function GET(request: Request, { params }: { params: Promise<{ eventId: string; memberId: string }> }) {
  const { eventId, memberId } = await params;

  const getMemberBalanceResponse = await getMemberBalance(eventId, memberId);

  return createSuccessResponse(getMemberBalanceResponse, 'OK');
}

