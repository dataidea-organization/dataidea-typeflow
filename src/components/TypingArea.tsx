import { useRef, useEffect } from "react";

interface TypingAreaProps {
  words: string[];
  currentWordIndex: number;
  currentCharIndex: number;
  charResults: Map<string, "correct" | "incorrect">;
  onKeyDown: (e: React.KeyboardEvent) => void;
  status: "idle" | "running" | "finished";
}

export function TypingArea({
  words,
  currentWordIndex,
  currentCharIndex,
  charResults,
  onKeyDown,
  status,
}: TypingAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status !== "finished") {
      containerRef.current?.focus();
    }
  }, [status]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative w-full max-w-4xl mx-auto outline-none cursor-text select-none rounded-lg p-6 md:p-8 min-h-[160px] bg-card/50 border border-border/50 focus:border-primary/30 transition-colors"
    >
      {status === "idle" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-muted-foreground text-sm animate-pulse">
            Click here and start typing...
          </p>
        </div>
      )}
      <div className="flex flex-wrap gap-x-2 gap-y-1 text-lg md:text-xl leading-relaxed font-mono">
        {words.slice(0, 50).map((word, wordIdx) => (
          <span key={wordIdx} className="inline-block">
            {word.split("").map((char, charIdx) => {
              const key = `${wordIdx}-${charIdx}`;
              const result = charResults.get(key);
              const isCurrent =
                wordIdx === currentWordIndex && charIdx === currentCharIndex;

              let className = "text-upcoming";
              if (result === "correct") className = "text-correct";
              else if (result === "incorrect") className = "text-incorrect";
              else if (wordIdx < currentWordIndex) className = "text-upcoming";

              return (
                <span key={charIdx} className="relative">
                  {isCurrent && status !== "finished" && (
                    <span className="absolute -left-[1px] top-0 w-[2px] h-full bg-cursor animate-blink rounded-full" />
                  )}
                  <span className={className}>{char}</span>
                </span>
              );
            })}
            {/* Cursor after last char of current word */}
            {wordIdx === currentWordIndex &&
              currentCharIndex === word.length &&
              status !== "finished" && (
                <span className="relative">
                  <span className="absolute -left-[1px] top-0 w-[2px] h-full bg-cursor animate-blink rounded-full" />
                </span>
              )}
          </span>
        ))}
      </div>
    </div>
  );
}
