import { createSuccessResponse } from '@/app/api/_utils/functions';
import { getEventMembersBalance, getMemberBalance } from './functions';

export async function GET(request: Request, { params }: { params: Promise<{ eventId: string; memberId: string }> }) {
  const { eventId, memberId } = await params;

  const getMemberBalanceResponse = await getMemberBalance(eventId, memberId);

  const membersBalance = await getEventMembersBalance(eventId);
  console.log('new balance', membersBalance);
  // Output: [{ name: 'John Doe', balance: 5500 }, { name: 'Jane Smith', balance: -3200 }, ...]

  return createSuccessResponse(getMemberBalanceResponse, 'OK');
}

