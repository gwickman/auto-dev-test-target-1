export class ValidationError extends Error {
  constructor(message: string, public readonly field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class EmptyStringError extends ValidationError {
  constructor(field?: string) {
    super('String cannot be empty', field);
    this.name = 'EmptyStringError';
  }
}

export class InvalidNumberError extends ValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'InvalidNumberError';
  }
}

export class OutOfRangeError extends ValidationError {
  constructor(value: number, min: number, max: number, field?: string) {
    super(`Value ${value} is out of range [${min}, ${max}]`, field);
    this.name = 'OutOfRangeError';
  }
}
