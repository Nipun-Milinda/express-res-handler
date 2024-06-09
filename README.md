## Overview

The `sendResponse` utility function is designed to standardize API responses in your Express.js applications. It simplifies sending JSON responses by encapsulating common response patterns, including the status code, success flag, data, and an optional message.

## Installation

First, install the package via NPM:

```sh
npm install express-res-handler
```

## Usage

To use the `sendResponse` utility in your Express.js application, import it and use it within your route handlers.

### Importing the Utility

In JavaScript:

```javascript
const { sendResponse } = require('express-res-handler');
```

In TypeScript:

```typescript
import { sendResponse } from 'express-res-handler';
```

### Function Signature

```typescript
sendResponse(
  res: Response,
  statusCode: number,
  success: boolean,
  data: ResponseData | null = {},
  message?: string
): Response
```

### Parameters

- **res** (`Response`): The Express.js response object.
- **statusCode** (`number`): The HTTP status code to be sent.
- **success** (`boolean`): A boolean indicating the success or failure of the operation.
- **data** (`ResponseData | null`): An object containing the response data. Defaults to an empty object if not provided.
- **message** (`string`, optional): An optional message string to include in the response.

### Return Value

The function returns the Express.js response object with the JSON response.

### Example Usage

In JavaScript:

```javascript
const express = require('express');
const { sendResponse } = require('express-res-handler');

const app = express();

app.get('/api/example', (req, res) => {
  const exampleData = { key: 'value' };
  sendResponse(res, 200, true, exampleData, 'Request successful');
});

app.get('/api/error', (req, res) => {
  sendResponse(res, 500, false, null, 'Internal server error');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

In TypeScript:

```typescript
import express, { Request, Response } from 'express';
import { sendResponse } from 'express-res-handler';

const app = express();

app.get('/api/example', (req: Request, res: Response) => {
  const exampleData = { key: 'value' };
  sendResponse(res, 200, true, exampleData, 'Request successful');
});

app.get('/api/error', (req: Request, res: Response) => {
  sendResponse(res, 500, false, null, 'Internal server error');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### Example Response

A successful response:

```json
{
  "success": true,
  "data": {
    "key": "value"
  },
  "message": "Request successful"
}
```

An error response:

```json
{
  "success": false,
  "data": {},
  "message": "Internal server error"
}
```

## TypeScript Definitions

### ResponseData Interface

Define the `ResponseData` interface to specify the structure of the response data:

```typescript
interface ResponseData {
  [key: string]: any;
}
```

### sendResponse Function

The `sendResponse` function is typed as follows:

```typescript
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
```

## Contributing

If you'd like to contribute to the project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
