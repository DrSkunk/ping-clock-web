export function Clock({ ping, average, packetLoss }) {
  const largeMarkers = [1, 10, 100, 1000];
  const smallMarkers = [
    2, 3, 4, 5, 6, 7, 8, 9, 20, 30, 40, 50, 60, 70, 80, 90, 200, 300, 400, 500,
    600, 700, 800, 900,
  ];
  const dots = [-93.75, -97.5, -101.25, 93.75, 97.5, 101.25];

  const bigHand = packetLoss ? 1900 : logScale(ping);
  const smallHand = packetLoss ? 1900 : logScale(average);
  return (
    <div className="portrait:w-[100vw] portrait:h-[100vw] landscape:w-[100vh] landscape:h-[100vh] relative">
      <div className="absolute top-10 right-10 bottom-10 left-10 rounded-full bg-gray-100 border-8 border-gray-300 shadow-md">
        <div className="absolute top-1/2 bottom-1/2 left-1/2 right-1/2">
          <div
            className={`absolute w-10 h-10 rounded-full bg-black -translate-x-1/2 -translate-y-1/2`}
          ></div>
        </div>
        <Line rotate={-105} size={LineSize.large} />
        {largeMarkers.map((x) => (
          <Line key={x} rotate={logScale(x)} size={LineSize.large} />
        ))}
        <Line rotate={105} size={LineSize.large} />
        {smallMarkers.map((x) => (
          <Line key={x} rotate={logScale(x)} size={LineSize.small} />
        ))}
        {dots.map((x) => (
          <Circle key={x} rotate={x} />
        ))}
        <Hand rotate={bigHand} size={HandSize.large} />
        <Hand rotate={smallHand} size={HandSize.small} />
        <div className="absolute top-1/2 bottom-1/2 left-1/2 right-1/2">
          <div
            className={`absolute w-3 h-3 rounded-full bg-gray-200 -translate-x-1/2 -translate-y-1/2`}
          ></div>
        </div>
      </div>
    </div>
  );
}

function Hand({ rotate, size }) {
  return (
    <div
      className="absolute top-0 bottom-0 left-1/2 right-1/2 transition duration-[800ms] shadow-md"
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div className={`absolute ${size} bg-black -translate-x-1/2`}></div>
    </div>
  );
}

function Circle({ rotate }) {
  return (
    <div
      className="absolute top-0 bottom-0 left-1/2 right-1/2"
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        className={`absolute top-6 w-3 h-3 rounded-full bg-gray-500-translate-x-1/2`}
      ></div>
    </div>
  );
}

function Line({ rotate, size }) {
  const sizeClass = size ? size : LineSize.small;
  return (
    <div
      className="absolute top-0 bottom-0 left-1/2 right-1/2"
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        className={`absolute top-0 ${sizeClass} bg-gray-500 -translate-x-1/2`}
      ></div>
    </div>
  );
}

const LineSize = {
  small: "w-2 bottom-[97%]",
  large: "w-4 bottom-[92%]",
};

const HandSize = {
  small: "w-4 top-[18%] bottom-[45%]",
  large: "w-4 top-[5%] bottom-[45%]",
};

function logScale(X) {
  return map(Math.log(X), 0, Math.log(1000), 0, 180) - 90;
}

function map(X, in_min, in_max, out_min, out_max) {
  return ((X - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
