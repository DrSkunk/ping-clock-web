import { useRef, useEffect, useState } from "react";
export default function usePing() {
  const ws = useRef(null);
  const [ping, setPing] = useState(null);
  const [average, setAverage] = useState(null);
  const [packetLoss, setPacketLoss] = useState(null);
  const [error, setError] = useState(null);

  const parseMessage = (message) => {
    const data = JSON.parse(message.data);
    if (data.type === "ping") {
      setPing(data.message.ms);
      setPacketLoss(false);
      setAverage(data.message.average);
    } else if (data.type === "error") {
      setPing(null);
      setPacketLoss(true);
      setAverage(null);
    }
  };

  function connect() {
    ws.current = new WebSocket("ws://localhost:8080");
    ws.current.onopen = () => {
      console.log("Connected");
    };
    ws.current.onmessage = parseMessage;
    ws.current.onclose = function (e) {
      console.log(
        "Socket is closed. Reconnect will be attempted in 1 second.",
        e.reason
      );
      setTimeout(() => {
        connect();
      }, 1000);
    };

    ws.current.onerror = (err) => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );
      ws.close();
    };
    const wsCurrent = ws.current;
    return () => {
      wsCurrent.close();
    };
  }

  useEffect(() => {
    return connect();
  }, []);
  console.log([ping, average, packetLoss, error]);
  return [ping, average, packetLoss, error];
}
