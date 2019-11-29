class HttpException extends Error {
  constructor(message, status = 400, payload) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
    this.payload = payload;
  }
}

export default HttpException;
