const { WebSocketServer } = require("ws");
const Ping = require("ping-lite");
const { default: Queue } = require("./queue");

const config = {
  host: process.env.HOST || "1.1.1.1",
  port: process.env.PORT || 8080,
  interval: process.env.INTERVAL || 1000,
  pingAmountForAverage: process.env.PING_AMOUNT_FOR_AVERAGE || 20,
};

console.log(config);

const wss = new WebSocketServer({ port: config.port });
const pinger = new Ping(config.host, { interval: config.interval });
const pingsQueue = new Queue(config.pingAmountForAverage);

pinger.start((err, ms) => {
  if (err) {
    console.error("ping timed out");
    pingsQueue.clear();
    broadcast({ type: "error", message: err.message });
  } else {
    console.log(`responded in ${ms}ms`);
    pingsQueue.enqueue(ms);
    broadcast({ type: "ping", message: { ms, average: pingsQueue.average() } });
  }
});

function broadcast(message) {
  const msg = JSON.stringify(message);
  wss.clients.forEach((client) => {
    client.send(msg);
  });
}

wss.on("connection", (ws) => {
  console.log("New client connected", ws);
});
