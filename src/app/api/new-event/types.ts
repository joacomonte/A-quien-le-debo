type ErrorDetails = {
  message: string;
};

type EventResponseData = {
  eventName: string;
  eventId: string;
  memberId: number;
  memberName: string;
};

type PostgrestError = {
  message: string;
};

type ApiResponse = {
  data: EventResponseData;
  status: string;
  message: string | PostgrestError | null;
};

type ApiResponseERROR = {
  data: null;
  status: string;
  message: string | PostgrestError | null;
};
