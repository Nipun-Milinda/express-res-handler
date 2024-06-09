const sendResponse = (res, statusCode, success, data = {}, message = undefined) => {
    const response = {
        success,
        data: data === null ? {} : data,
        message,
    };
    return res.status(statusCode).json(response);
};
export { sendResponse };
