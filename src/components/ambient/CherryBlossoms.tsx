import { useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Blossom {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
}

const COUNT = 18;

function makeBlossoms(): Blossom[] {
  return Array.from({ length: COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: -10 - Math.random() * 20,
    size: 8 + Math.random() * 9,
    duration: 10 + Math.random() * 12,
    delay: Math.random() * -14,
    rotate: Math.random() * 360,
  }));
}

const CherryBlossoms = () => {
  const { theme } = useTheme();
  const blossoms = useMemo(makeBlossoms, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {blossoms.map((blossom) => (
        <div
          key={blossom.id}
          className="blossom-petal absolute"
          style={{
            left: `${blossom.left}%`,
            top: `${blossom.top}%`,
            width: `${blossom.size}px`,
            height: `${blossom.size}px`,
            opacity: theme === "dark" ? 0.35 : 0.8,
            animationDuration: `${blossom.duration}s`,
            animationDelay: `${blossom.delay}s`,
            transform: `rotate(${blossom.rotate}deg)`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default CherryBlossoms;
