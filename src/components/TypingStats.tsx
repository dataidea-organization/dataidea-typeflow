interface TypingStatsProps {
  timeLeft: number;
  wpm: number;
  accuracy: number;
  status: "idle" | "running" | "finished";
}

export function TypingStats({ timeLeft, wpm, accuracy, status }: TypingStatsProps) {
  return (
    <div className="flex items-center gap-8 text-sm font-mono">
      <div className="flex flex-col items-center gap-1">
        <span className="text-muted-foreground text-xs uppercase tracking-widest">time</span>
        <span className="text-2xl font-semibold text-primary">{timeLeft}s</span>
      </div>
      {status === "running" && (
        <>
          <div className="flex flex-col items-center gap-1">
            <span className="text-muted-foreground text-xs uppercase tracking-widest">wpm</span>
            <span className="text-2xl font-semibold text-foreground">{wpm}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-muted-foreground text-xs uppercase tracking-widest">acc</span>
            <span className="text-2xl font-semibold text-foreground">{accuracy}%</span>
          </div>
        </>
      )}
    </div>
  );
}
