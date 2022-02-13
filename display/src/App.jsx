import { Clock } from "./Clock";
import usePing from "./usePing";

function App() {
  const [ping, average, packetLoss, error] = usePing(
    import.meta.env.VITE_SERVER_URI
  );
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Clock ping={ping} average={average} packetLoss={packetLoss} />
    </div>
  );
}

export default App;
