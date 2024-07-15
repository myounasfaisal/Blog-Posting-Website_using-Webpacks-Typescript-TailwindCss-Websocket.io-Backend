export class apiResponse {
  constructor(message, status, data, success = true) {
    this.message = message;
    this.status = status;
    this.data = data;
    this.success = success;
  }
}
