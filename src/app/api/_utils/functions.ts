export function createErrorResponse(error: any) {
  const response: ApiResponseERROR = {
    data: null,
    status: "error",
    message: error,
  };
  return new Response(JSON.stringify(response));
}

export function createSuccessResponse<DataType>(
  data: DataType,
  message: string,
): Response {
  const response: ApiResponse<DataType> = {
    data: data,
    status: "OK",
    message: message,
  };
  return new Response(JSON.stringify(response));
}
