export default class ValidationError extends Error {
  constructor(message, data) {
    super(message);
    this.errors = data;
  }
}
