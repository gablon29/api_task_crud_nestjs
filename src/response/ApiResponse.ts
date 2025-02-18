export class ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;

  constructor(status: number, success: boolean, message: string, data: T) {
    this.status = status;
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
