import {
  ValidationError,
  EmptyStringError,
  InvalidNumberError,
  OutOfRangeError,
} from '../../src/errors/index.js';

describe('ValidationError', () => {
  it('should create a ValidationError instance', () => {
    const error = new ValidationError('Test error');
    expect(error).toBeInstanceOf(ValidationError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('ValidationError');
  });

  it('should store the field property', () => {
    const error = new ValidationError('Test error', 'username');
    expect(error.field).toBe('username');
  });

  it('should have undefined field when not provided', () => {
    const error = new ValidationError('Test error');
    expect(error.field).toBeUndefined();
  });
});

describe('EmptyStringError', () => {
  it('should create an EmptyStringError instance', () => {
    const error = new EmptyStringError();
    expect(error).toBeInstanceOf(EmptyStringError);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('String cannot be empty');
    expect(error.name).toBe('EmptyStringError');
  });

  it('should store the field property', () => {
    const error = new EmptyStringError('username');
    expect(error.field).toBe('username');
  });

  it('should have undefined field when not provided', () => {
    const error = new EmptyStringError();
    expect(error.field).toBeUndefined();
  });
});

describe('InvalidNumberError', () => {
  it('should create an InvalidNumberError instance', () => {
    const error = new InvalidNumberError('Must be a number');
    expect(error).toBeInstanceOf(InvalidNumberError);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Must be a number');
    expect(error.name).toBe('InvalidNumberError');
  });

  it('should store the field property', () => {
    const error = new InvalidNumberError('Must be a number', 'age');
    expect(error.field).toBe('age');
  });

  it('should have undefined field when not provided', () => {
    const error = new InvalidNumberError('Must be a number');
    expect(error.field).toBeUndefined();
  });
});

describe('OutOfRangeError', () => {
  it('should create an OutOfRangeError instance', () => {
    const error = new OutOfRangeError(150, 0, 100);
    expect(error).toBeInstanceOf(OutOfRangeError);
    expect(error).toBeInstanceOf(ValidationError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Value 150 is out of range [0, 100]');
    expect(error.name).toBe('OutOfRangeError');
  });

  it('should store the field property', () => {
    const error = new OutOfRangeError(150, 0, 100, 'age');
    expect(error.field).toBe('age');
  });

  it('should have undefined field when not provided', () => {
    const error = new OutOfRangeError(150, 0, 100);
    expect(error.field).toBeUndefined();
  });

  it('should format the message correctly', () => {
    const error = new OutOfRangeError(5, 10, 20);
    expect(error.message).toBe('Value 5 is out of range [10, 20]');
  });
});
