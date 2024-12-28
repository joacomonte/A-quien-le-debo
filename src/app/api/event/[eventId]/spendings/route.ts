import { createErrorResponse, createSuccessResponse } from '@/app/api/_utils/functions';
import { addSpending, deleteSpending, getSpendings, linkSpendingToConsumers } from './functions';
import { isEmptyInput } from '@/app/api/_utils/validations';

type Params = {
  params: {
    eventId: string;
  };
};

export async function GET(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;

  try {
    const allSpendingsResponse = await getSpendings(eventId);

    if (allSpendingsResponse.error) return createErrorResponse(allSpendingsResponse.error);

    console.log('res', allSpendingsResponse?.data);

    return createSuccessResponse(allSpendingsResponse?.data);
  } catch (error) {
    return createErrorResponse(error);
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;

  const { spenderId, consumers, title, amount, notes } = await request.json();

  if (isEmptyInput(spenderId) || isEmptyInput(title) || isEmptyInput(amount)) {
    return createErrorResponse('Some required fields are missing');
  }

  try {
    const addSpendingResponse = await addSpending(eventId, spenderId, title, amount, notes);

    if (addSpendingResponse.error) return createErrorResponse(addSpendingResponse.error);

    if (consumers.length === 0) return createSuccessResponse(addSpendingResponse, 'Spending added without consumers');

    const spendId = addSpendingResponse.data[0].spendId;

    try {
      const linkResponse = await linkSpendingToConsumers(spendId, consumers);
      return createSuccessResponse(linkResponse, 'Spending added linked with consumers');
    } catch (error) {
      throw error;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return createErrorResponse(error);
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ eventId: string }> }) {
  console.log('ass');
  
  const { eventId } = await params;
  const { spendId } = await request.json();

  if (!eventId || eventId === null || eventId === undefined || !spendId || spendId === null || spendId === undefined) {
    return createErrorResponse('eventId or spendId null');
  }

  try {
    const removeSpendingResponse = await deleteSpending(eventId, spendId);
    if (removeSpendingResponse.deleted) {
      return createSuccessResponse({},"Deleted successfully");
    }
    else {
      return createSuccessResponse({}, "Eror deleting")
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return createErrorResponse(error);
  }
}