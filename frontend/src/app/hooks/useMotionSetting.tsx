import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type MotionChoice = "system" | "on" | "reduced";
type MotionState = { choice: MotionChoice; reduced: boolean; setChoice: (choice: MotionChoice) => void };
const MotionContext = createContext<MotionState | null>(null);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [choice, setChoiceState] = useState<MotionChoice>(() => {
    try {
      const saved = localStorage.getItem("motion");
      return saved === "on" || saved === "reduced" ? saved : "system";
    } catch {
      return "system";
    }
  });
  const [deviceReduced, setDeviceReduced] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setDeviceReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const setChoice = (next: MotionChoice) => {
    setChoiceState(next);
    try { localStorage.setItem("motion", next); } catch {}
  };
  const value = useMemo(() => ({ choice, reduced: choice === "reduced" || (choice === "system" && deviceReduced), setChoice }), [choice, deviceReduced]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotionSetting() {
  const value = useContext(MotionContext);
  if (!value) throw new Error("useMotionSetting must be used inside MotionProvider");
  return value;
}

export function MotionControl() {
  const { choice, setChoice } = useMotionSetting();
  return <fieldset className="mt-5">
    <legend className="font-mono text-[10px] text-foreground/65">MOTION</legend>
    <div className="mt-2 flex rounded-xl border border-border-subtle p-1 shadow-inset">
      {(["system", "on", "reduced"] as const).map((item) => <button key={item} type="button" aria-pressed={choice === item} onClick={() => setChoice(item)} className={`min-h-11 rounded-lg px-3 text-xs capitalize ${choice === item ? "bg-background-elevated shadow-small" : ""}`}>{item}</button>)}
    </div>
  </fieldset>;
}
