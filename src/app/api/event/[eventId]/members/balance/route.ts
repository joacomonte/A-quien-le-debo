import { createSuccessResponse } from "@/app/api/_utils/functions";
import { getEventMembersBalance } from "../[memberId]/balance/functions";

export async function GET(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;

  const membersBalance = await getEventMembersBalance(eventId);
  
  console.log('new balance', membersBalance);

  return createSuccessResponse(membersBalance, 'OK');
}