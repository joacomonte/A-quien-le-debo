type ApiResponse<DataType> = {
  data: DataType;
  status: string;
  message: string;
};

type ApiResponseERROR = {
  data: null;
  status: string;
  message: PostgrestError;
};

type PostgrestError = {
  message: string;
};


type ParamsType<T extends string> = Promise<{ [key in T]: string }>;