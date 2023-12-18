export function createErrorResponse(errorMessage: PostgrestError) {
  const response: ApiResponseERROR = {
    data: null,
    status: "error",
    message: errorMessage,
  };
  return new Response(JSON.stringify(response));
}

// Function to create a success response
export function createSuccessResponse<DataType>(
  data: DataType,
  status: string,
  message: string,
): Response {
  const response: ApiResponse<DataType> = {
    data: data,
    status: "ok",
    message: message,
  };
  console.log("data sended", response);

  return new Response(JSON.stringify(response));
}
