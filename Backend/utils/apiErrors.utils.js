export class apiErrors extends Error {
  constructor(
    message = "Something Went Wrong",
    status = 500,
    success = false,
    errors = [],
    stack
  ) {
    super(message);
    this.status = status;
    this.success = success;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
