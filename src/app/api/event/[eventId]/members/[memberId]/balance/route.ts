import { createSuccessResponse } from "@/app/api/_utils/functions";
import { getMemberBalance } from "./functions";


export async function POST(request: Request, { params }: { params: { eventId: string; memberId: string } }) {
  const { eventId, memberId } = params;

  const getMemberBalanceResponse = await getMemberBalance(eventId, memberId);

  return createSuccessResponse(getMemberBalanceResponse, "OK");
}