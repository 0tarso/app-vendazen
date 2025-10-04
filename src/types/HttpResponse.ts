export interface HttpResponse {
  statusCode: number;
  body?: {
    message: string,
    content: any
  }
}