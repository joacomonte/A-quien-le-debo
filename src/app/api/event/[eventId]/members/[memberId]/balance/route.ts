import { createSuccessResponse } from "@/app/api/_utils/functions";
import { getMemberBalance } from "./functions";


type Params = {
  params: {
    eventId: string;
    memberId: string;
  };
};

export async function POST(request: Request, params: Params) {
  const { eventId, memberId } = await params.params;

  const getMemberBalanceResponse = await getMemberBalance(eventId, memberId) ;

  return createSuccessResponse(getMemberBalanceResponse, "OK");
  
}