import { useTheme } from "../../context/ThemeContext";

/**
 * A translucent pink-red sun in the hero sky that morphs into a pale
 * moon when clicked. Built as two stacked layers (sun / moon) that
 * crossfade via opacity rather than animating the `background` property
 * directly — browsers don't reliably interpolate between two different
 * gradients on a plain `transition: background`, but opacity always
 * transitions smoothly, so this is the robust way to get a real morph.
 */
const SunMoon = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to daytime" : "Switch to nighttime"}
      className="sun-moon absolute top-[13%] right-[13%] md:right-[16%] w-14 h-14 md:w-20 md:h-20 rounded-full border-0 p-0 cursor-pointer"
    >
      <span
        className="sun-moon-layer"
        style={{
          background:
            "radial-gradient(circle at 36% 34%, hsl(350 85% 80%) 0%, hsl(4 72% 58%) 55%, hsl(4 72% 58% / 0) 100%)",
          boxShadow: "0 0 34px hsl(4 72% 58% / 0.4), 0 0 70px hsl(350 85% 72% / 0.28)",
          opacity: isDark ? 0 : 0.58,
        }}
      />
      <span
        className="sun-moon-layer"
        style={{
          background:
            "radial-gradient(circle at 36% 34%, hsl(45 40% 94%) 0%, hsl(220 22% 84%) 55%, hsl(220 22% 84% / 0) 100%)",
          boxShadow: "0 0 34px hsl(45 35% 88% / 0.55), 0 0 70px hsl(220 30% 75% / 0.32)",
          opacity: isDark ? 0.92 : 0,
        }}
      />
    </button>
  );
};

export default SunMoon;