class CustomException extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
  }
}

module.exports = CustomException;
