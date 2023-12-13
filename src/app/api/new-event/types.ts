type ErrorDetails = {
  message: string;
};

type EventResponseData = {
  eventName: string;
  eventId: string;
};

type PostgrestError = {
  message: string;
};

type ApiResponse = {
  data: EventResponseData | null;
  status: string;
  message: string | PostgrestError;
};
