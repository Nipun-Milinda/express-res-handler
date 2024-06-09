"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, statusCode, success, data = {}, message) => {
    const response = {
        success,
        data: data === null ? {} : data,
        message,
    };
    return res.status(statusCode).json(response);
};
exports.sendResponse = sendResponse;
