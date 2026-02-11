import { useState, useCallback, useRef, useEffect } from "react";
import { generateWords } from "@/data/wordLists";

export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  timeElapsed: number;
}

export type TestStatus = "idle" | "running" | "finished";

export function useTypingTest(duration: number) {
  const [words, setWords] = useState<string[]>(() => generateWords(80));
  const [input, setInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [status, setStatus] = useState<TestStatus>("idle");
  const [timeLeft, setTimeLeft] = useState(duration);
  const [charResults, setCharResults] = useState<Map<string, "correct" | "incorrect">>(new Map());
  
  const startTimeRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const correctCharsRef = useRef(0);
  const incorrectCharsRef = useRef(0);
  const totalCharsRef = useRef(0);

  const reset = useCallback(() => {
    setWords(generateWords(80));
    setInput("");
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setStatus("idle");
    setTimeLeft(duration);
    setCharResults(new Map());
    startTimeRef.current = null;
    correctCharsRef.current = 0;
    incorrectCharsRef.current = 0;
    totalCharsRef.current = 0;
    if (timerRef.current) clearInterval(timerRef.current);
  }, [duration]);

  useEffect(() => {
    reset();
  }, [duration, reset]);

  useEffect(() => {
    if (status === "running") {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setStatus("finished");
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  const getStats = useCallback((): TypingStats => {
    const elapsed = duration - timeLeft;
    const minutes = elapsed / 60;
    const wpm = minutes > 0 ? Math.round((correctCharsRef.current / 5) / minutes) : 0;
    const total = totalCharsRef.current;
    const accuracy = total > 0 ? Math.round((correctCharsRef.current / total) * 100) : 100;
    return {
      wpm,
      accuracy,
      correctChars: correctCharsRef.current,
      incorrectChars: incorrectCharsRef.current,
      totalChars: total,
      timeElapsed: elapsed,
    };
  }, [duration, timeLeft]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (status === "finished") return;

      if (status === "idle") {
        setStatus("running");
        startTimeRef.current = Date.now();
      }

      const currentWord = words[currentWordIndex];

      if (e.key === " ") {
        e.preventDefault();
        if (currentCharIndex > 0) {
          // Mark remaining chars as incorrect
          for (let i = currentCharIndex; i < currentWord.length; i++) {
            const key = `${currentWordIndex}-${i}`;
            setCharResults((prev) => new Map(prev).set(key, "incorrect"));
            incorrectCharsRef.current++;
            totalCharsRef.current++;
          }
          setCurrentWordIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
          setInput("");
        }
        return;
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        if (currentCharIndex > 0) {
          const key = `${currentWordIndex}-${currentCharIndex - 1}`;
          const prevResult = charResults.get(key);
          if (prevResult === "correct") correctCharsRef.current--;
          if (prevResult === "incorrect") incorrectCharsRef.current--;
          totalCharsRef.current--;
          setCharResults((prev) => {
            const next = new Map(prev);
            next.delete(key);
            return next;
          });
          setCurrentCharIndex((prev) => prev - 1);
          setInput((prev) => prev.slice(0, -1));
        }
        return;
      }

      if (e.key.length === 1) {
        e.preventDefault();
        if (currentCharIndex >= currentWord.length) return;

        const isCorrect = e.key === currentWord[currentCharIndex];
        const key = `${currentWordIndex}-${currentCharIndex}`;
        
        if (isCorrect) {
          correctCharsRef.current++;
        } else {
          incorrectCharsRef.current++;
        }
        totalCharsRef.current++;

        setCharResults((prev) => new Map(prev).set(key, isCorrect ? "correct" : "incorrect"));
        setCurrentCharIndex((prev) => prev + 1);
        setInput((prev) => prev + e.key);

        // Auto-advance on last char of word if correct
        if (currentCharIndex === currentWord.length - 1 && isCorrect) {
          // don't auto-advance, wait for space
        }
      }
    },
    [status, words, currentWordIndex, currentCharIndex, charResults]
  );

  return {
    words,
    input,
    currentWordIndex,
    currentCharIndex,
    status,
    timeLeft,
    charResults,
    handleKeyDown,
    reset,
    getStats,
  };
}
