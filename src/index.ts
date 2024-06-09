import { Response } from 'express';

interface ResponseData {
  [key: string]: any;
}

const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  data: ResponseData | null = {},
  message?: string
): Response => {
  const response = {
    success,
    data: data === null ? {} : data,
    message,
  };
  return res.status(statusCode).json(response);
};

export { sendResponse };
