import { Clock } from "./Clock";
import usePing from "./usePing";

function App() {
  const [ping, average, packetLoss, error] = usePing();
  console.log(import.meta.env);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Clock ping={ping} average={average} packetLoss={packetLoss} />
    </div>
  );
}

export default App;
