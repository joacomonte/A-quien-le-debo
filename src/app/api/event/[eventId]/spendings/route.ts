import {
  createErrorResponse,
  createSuccessResponse,
} from "@/app/api/_utils/functions";
import { addSpending, linkSpendingToConsumers } from "./functions";
import { isEmptyInput } from "@/app/api/_utils/validations";

type Params = {
  params: {
    eventId: string;
  };
};

export async function POST(req: Request, params: Params) {
  const { eventId } = params.params;

  const { spenderId, consumers, title, amount, notes } = await req.json();

  console.log("que llega: ", spenderId, consumers, title, amount, notes);

  if (isEmptyInput(spenderId) || isEmptyInput(title) || isEmptyInput(amount)) {
    console.log(spenderId, title, amount);
    return createErrorResponse("Some required fields are missing");
  }

  try {
    const addSpendingResponse = await addSpending(
      eventId,
      spenderId,
      title,
      amount,
      notes,
    );

    if (!addSpendingResponse.error) {
      const spendId = addSpendingResponse.data[0].spendId;
      try {
        const linkResponse = await linkSpendingToConsumers(spendId, consumers);
        return createSuccessResponse(linkResponse, "ok");
      } catch {
        console.log("error");
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return createErrorResponse(error);
  }
}
