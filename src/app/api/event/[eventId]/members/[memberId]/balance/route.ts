import { createSuccessResponse } from '@/app/api/_utils/functions';
import { getMemberBalance } from './functions';

// type Params = {
//   params: {
//     eventId: string;
//     memberId: string;
//   };
// };

export async function GET(request: Request, { params }: { params: Promise<{ eventId: string; memberId: string }> }) {
  const { eventId, memberId } = await params;

  const getMemberBalanceResponse = await getMemberBalance(eventId, memberId);

  return new Response(JSON.stringify(createSuccessResponse(getMemberBalanceResponse, 'OK')), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

// export async function GET(request: Request, params: Params) {
//   const { eventId, memberId } = await params.params;

//   const getMemberBalanceResponse = await getMemberBalance(eventId, memberId) ;

//   return createSuccessResponse({getMemberBalanceResponse}, "OK");

// }
