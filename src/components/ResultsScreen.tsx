import type { TypingStats } from "@/hooks/useTypingTest";

interface ResultsScreenProps {
  stats: TypingStats;
  onRestart: () => void;
}

export function ResultsScreen({ stats, onRestart }: ResultsScreenProps) {
  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-8">
      <h2 className="text-3xl font-semibold text-foreground font-mono">Results</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="WPM" value={stats.wpm} highlight />
        <StatCard label="Accuracy" value={`${stats.accuracy}%`} highlight />
        <StatCard label="Correct" value={stats.correctChars} />
        <StatCard label="Errors" value={stats.incorrectChars} />
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-mono font-medium hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card border border-border">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <span
        className={`text-3xl font-bold font-mono ${
          highlight ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
