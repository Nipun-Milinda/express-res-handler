import { sendResponse } from './index';
import { Response } from 'express';
import sinon from 'sinon';

interface MockResponse extends Response {
  status: sinon.SinonStub;
  json: sinon.SinonStub;
}

describe('sendResponse', () => {
  let res: MockResponse;

  beforeEach(() => {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    } as any as MockResponse;
  });

  it('should return a response with the correct status code and structure', () => {
    const statusCode = 200;
    const success = true;
    const data = { key: 'value' };
    const message = 'Success message';

    sendResponse(res, statusCode, success, data, message);

    expect(res.status.calledWith(statusCode)).toBe(true);
    expect(res.json.calledWith({
      success,
      data,
      message,
    })).toBe(true);
  });

  it('should return a response with default data as an empty object if data is not provided', () => {
    const statusCode = 400;
    const success = false;
    const message = 'Error message';

    sendResponse(res, statusCode, success, undefined, message);

    expect(res.status.calledWith(statusCode)).toBe(true);
    expect(res.json.calledWith({
      success,
      data: {},
      message,
    })).toBe(true);
  });

  it('should return a response with default message as undefined if message is not provided', () => {
    const statusCode = 500;
    const success = false;
    const data = { error: 'Something went wrong' };

    sendResponse(res, statusCode, success, data);

    expect(res.status.calledWith(statusCode)).toBe(true);
    expect(res.json.calledWith({
      success,
      data,
      message: undefined,
    })).toBe(true);
  });

  it('should handle null data correctly', () => {
    const statusCode = 200;
    const success = true;
    const data = null;
    const message = 'Null data';

    sendResponse(res, statusCode, success, data, message);

    expect(res.status.calledWith(statusCode)).toBe(true);
    expect(res.json.calledWith({
      success,
      data: {},
      message,
    })).toBe(true);
  });

  it('should handle various status codes', () => {
    const statusCodes = [200, 201, 400, 401, 404, 500];

    statusCodes.forEach(statusCode => {
      sendResponse(res, statusCode, true, { test: 'data' }, 'Testing status codes');
      expect(res.status.calledWith(statusCode)).toBe(true);
      res.status.resetHistory();  // Reset history for the next iteration
    });
  });

  it('should handle different types of messages', () => {
    const statusCode = 200;
    const success = true;
    const data = { key: 'value' };
    const messages = ['', ' ', 'A message', 12345, true];

    messages.forEach(message => {
      sendResponse(res, statusCode, success, data, String(message)); // Convert message to string
      expect(res.json.calledWith({
        success,
        data,
        message: String(message), // Ensure message is stringified
      })).toBe(true);
      res.json.resetHistory();  // Reset history for the next iteration
    });
  });
});
