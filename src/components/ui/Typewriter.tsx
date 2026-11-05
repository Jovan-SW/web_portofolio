'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  textClassName?: string;
  cursorClassName?: string;
}

export default function Typewriter({
  words,
  typingSpeed = 65,
  deletingSpeed = 28,
  pauseDuration = 2400,
  className = '',
  textClassName = 'text-slate-200 drop-shadow-[0_2px_8px_rgba(148,163,184,0.35)]',
  cursorClassName = 'bg-sky-400',
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState(words[0] || '');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex];
    let timer: NodeJS.Timeout;

    // Word completed: comfortable reading pause
    if (isPaused) {
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timer);
    }

    // Graceful short pause between deleting and typing next word
    if (isBreathing) {
      timer = setTimeout(() => {
        setIsBreathing(false);
      }, 350);
      return () => clearTimeout(timer);
    }

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        // Humanized natural typing cadence: slight pause on spaces and symbols
        const nextChar = currentWord[displayText.length];
        const isPunctuationOrSpace = nextChar === ' ' || nextChar === '&' || nextChar === '/' || nextChar === '-';
        const cadenceDelay = isPunctuationOrSpace
          ? typingSpeed + 80
          : typingSpeed + (Math.sin(displayText.length * 1.5) * 12);

        timer = setTimeout(() => {
          const nextText = currentWord.slice(0, displayText.length + 1);
          setDisplayText(nextText);
          if (nextText.length === currentWord.length) {
            setIsPaused(true);
          }
        }, Math.max(30, cadenceDelay));
      } else if (!isPaused) {
        timer = setTimeout(() => {
          setIsPaused(true);
        }, 0);
      }
    } else {
      if (displayText.length > 0) {
        // Fast, fluid, and linear backspacing
        timer = setTimeout(() => {
          const nextText = currentWord.slice(0, displayText.length - 1);
          setDisplayText(nextText);
          if (nextText.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
            setIsBreathing(true);
          }
        }, deletingSpeed);
      } else {
        // Word cleared: take a calm breath, advance index
        timer = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setIsBreathing(true);
        }, 0);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isPaused, isBreathing, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={`inline-flex items-center tracking-normal ${className}`}>
      <span className={`select-none font-medium ${textClassName}`}>
        {displayText}
      </span>
      <span
        aria-hidden="true"
        className={`inline-block w-[2.5px] sm:w-[3px] h-[1.18em] ml-1 sm:ml-1.5 rounded-full align-middle animate-cursor-smooth ${cursorClassName}`}
      />
    </span>
  );
}
