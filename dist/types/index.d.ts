import { Response } from 'express';
interface ResponseData {
    [key: string]: any;
}
declare const sendResponse: (res: Response, statusCode: number, success: boolean, data?: ResponseData | null, message?: string) => Response;
export { sendResponse };
