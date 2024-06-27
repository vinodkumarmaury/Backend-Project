class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    //The stack property in your ApiError class relates to the call stack in programming,
    //which is a mechanism that tracks the active subroutines (or methods/functions) in your program. When an error occurs, the call stack provides a trace of the function calls that led to the error. This trace is useful for debugging because it shows where the error originated and the sequence of function calls that preceded it.
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
