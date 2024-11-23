import { createSuccessResponse } from "@/app/api/_utils/functions";
import { getMemberBalance } from "./functions";

type Params = {
  params: {
    eventId: string;
    memberId: string;
  };
};

export async function POST(req: Request, {params}: Params) {
  const { eventId, memberId } = await params;

  const getMemberBalanceResponse = await getMemberBalance(eventId, memberId) ;
  console.log('log event id', eventId);
  console.log('log event memberI', memberId);
  console.log('balance: ', getMemberBalanceResponse);
  return createSuccessResponse(memberId, "OK");
  
}