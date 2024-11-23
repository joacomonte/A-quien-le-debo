import {
  createErrorResponse,
  createSuccessResponse,
} from "@/app/api/_utils/functions";
import {
  addSpending,
  getSpendings,
  linkSpendingToConsumers,
} from "./functions";
import { isEmptyInput } from "@/app/api/_utils/validations";

type Params = {
  params: {
    eventId: string;
  };
};

export async function GET(req: Request, params: Params) {
  const { eventId } = await params.params;

  try {
    const allSpendingsResponse = await getSpendings(eventId);

    if (allSpendingsResponse.error)
      return createErrorResponse(allSpendingsResponse.error);

    return createSuccessResponse(
      allSpendingsResponse,
      "Returned all spendings from this event",
    );
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function POST(req: Request, params: Params) {
  const { eventId } = params.params;

  const { spenderId, consumers, title, amount, notes } = await req.json();

  if (isEmptyInput(spenderId) || isEmptyInput(title) || isEmptyInput(amount)) {
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

    if (addSpendingResponse.error)
      return createErrorResponse(addSpendingResponse.error);

    if (consumers.length === 0)
      return createSuccessResponse(
        addSpendingResponse,
        "Spending added without consumers",
      );

    const spendId = addSpendingResponse.data[0].spendId;

    try {
      const linkResponse = await linkSpendingToConsumers(spendId, consumers);
      return createSuccessResponse(
        linkResponse,
        "Spending added linked with consumers",
      );
    } catch {
      console.log("error");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return createErrorResponse(error);
  }
}
