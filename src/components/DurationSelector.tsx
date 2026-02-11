interface DurationSelectorProps {
  duration: number;
  onSelect: (d: number) => void;
  disabled: boolean;
}

const durations = [15, 30, 60];

export function DurationSelector({ duration, onSelect, disabled }: DurationSelectorProps) {
  return (
    <div className="flex items-center gap-1 font-mono text-sm">
      {durations.map((d) => (
        <button
          key={d}
          onClick={() => onSelect(d)}
          disabled={disabled}
          className={`px-3 py-1.5 rounded-md transition-colors ${
            duration === d
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {d}s
        </button>
      ))}
    </div>
  );
}
