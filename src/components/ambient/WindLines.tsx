const lines = [
  { left: 6, top: 22, width: 34, height: 1, opacity: 0.3, duration: 10 },
  { left: 40, top: 38, width: 28, height: 1, opacity: 0.24, duration: 12 },
  { left: 16, top: 64, width: 38, height: 1, opacity: 0.22, duration: 13 },
  { left: 54, top: 18, width: 22, height: 1, opacity: 0.18, duration: 9 },
  { left: 72, top: 54, width: 20, height: 1, opacity: 0.2, duration: 11 },
];

const WindLines = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {lines.map((line, index) => (
      <div
        key={`${line.left}-${line.top}`}
        className="wind-line absolute"
        style={{
          left: `${line.left}%`,
          top: `${line.top}%`,
          width: `${line.width}%`,
          height: `${line.height}px`,
          opacity: line.opacity,
          animationDuration: `${line.duration}s`,
          animationDelay: `${index * 0.8}s`,
        } as React.CSSProperties}
      />
    ))}
  </div>
);

export default WindLines;
