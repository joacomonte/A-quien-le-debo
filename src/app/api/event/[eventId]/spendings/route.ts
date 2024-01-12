import {
  createErrorResponse,
  createSuccessResponse,
} from "@/app/api/_utils/functions";
import { addSpending } from "./functions";
import { notEmptyInput } from "@/app/api/_utils/validations";

type Params = {
  params: {
    eventId: string;
  };
};

export async function POST(req: Request, params: Params) {
  const { eventId } = params.params;

  const { spenderId, title, amount, notes } = await req.json();

  if (
    notEmptyInput(spenderId) ||
    notEmptyInput(title) ||
    notEmptyInput(amount)
  ) {
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
    console.log(addSpendingResponse);

    return createSuccessResponse(
      addSpendingResponse,
      addSpendingResponse.statusText,
    );
  } catch (error) {
    console.error("An error occurred:", error);
    return createErrorResponse(error);
  }
}
