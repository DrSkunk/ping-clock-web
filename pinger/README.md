## Ping Clock Web Pinger

The pinger is written in [Node.js](https://nodejs.org/en/).

available scripts:

- `npm run start`: Start server

Used environment variables:

| Environment variable      | Description                                    | required/default value |
| ------------------------- | ---------------------------------------------- | ---------------------- |
| `HOST`                    | Address to ping to                             | `1.1.1.1`              |
| `PORT`                    | Port to host the client on                     | `2323`                 |
| `INTERVAL`                | Ping interval in milliseconds                  | `1000`                 |
| `PING_AMOUNT_FOR_AVERAGE` | How many pings are used to measure the average | `20`                   |
