export interface LogsInterface {
  logId: string;
  userId: string;
  endpoint: string;
  method: string;
  statusCode: number;
  description: string;
  date: Date;
}

export interface LogsDataResponse {
  message?: string;
  content?: LogsInterface[];
  pageSize?: number;
  total?: number;
  page?: number;
}
