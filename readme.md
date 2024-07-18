# Webhook Passer

This repository contains a Node.js application that forwards incoming webhooks to multiple target URLs using `Express` and `Axios`.

## Features

- Forwards incoming webhook requests to multiple target URLs.
- Logs the payload and response for each target.
- Handles errors and logs detailed error messages.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd webhook-passer
   ```

2. Install the dependencies:

```
npm install
```

3. Create a .env file in the root directory and add your environment variables:

```
DOMAIN_A=https://your-first-target-url.com/webhook
DOMAIN_B=https://your-second-target-url.com/webhook
```

## Usage

```
npm run dev
```

The server will start on the specified port (default is 3000) and listen for incoming POST requests at `/webhook-passer`.

## Example Request

Handle any tokens or credentials for each domain independently. This repo does not have this yet as hooks were exposed to regular requests without need for auth.

```
curl -X POST http://localhost:3000/webhook-passer \
  -H "Content-Type: application/json" \
  -d '{"Testing": "data to pass"}'
```

## License

This project is licensed under the MIT License.
