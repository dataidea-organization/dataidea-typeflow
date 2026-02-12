import { useState } from "react";
import { useTypingTest } from "@/hooks/useTypingTest";
import { TypingArea } from "@/components/TypingArea";
import { TypingStats } from "@/components/TypingStats";
import { ResultsScreen } from "@/components/ResultsScreen";
import { DurationSelector } from "@/components/DurationSelector";
import { RotateCcw, Keyboard } from "lucide-react";

const Index = () => {
  const [duration, setDuration] = useState(30);
  const {
    words,
    currentWordIndex,
    currentCharIndex,
    status,
    timeLeft,
    charResults,
    handleKeyDown,
    reset,
    getStats,
  } = useTypingTest(duration);

  const stats = getStats();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <Keyboard className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold font-mono text-foreground">
            dataidea<span className="text-primary">typeflow</span>
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-20 gap-8">
        {status === "finished" ? (
          <ResultsScreen stats={stats} onRestart={reset} />
        ) : (
          <>
            {/* Controls */}
            <div className="flex items-center gap-6">
              <DurationSelector
                duration={duration}
                onSelect={(d) => {
                  setDuration(d);
                }}
                disabled={status === "running"}
              />
              <button
                onClick={reset}
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Stats */}
            <TypingStats
              timeLeft={timeLeft}
              wpm={stats.wpm}
              accuracy={stats.accuracy}
              status={status}
            />

            {/* Typing Area */}
            <TypingArea
              words={words}
              currentWordIndex={currentWordIndex}
              currentCharIndex={currentCharIndex}
              charResults={charResults}
              onKeyDown={handleKeyDown}
              status={status}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-muted-foreground font-mono">
        tab + enter to restart
      </footer>
    </div>
  );
};

export default Index;
