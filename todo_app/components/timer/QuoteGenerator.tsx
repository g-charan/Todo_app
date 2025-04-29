"use client";

import { useEffect, useState } from "react";

const quotes = [
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "Concentration comes out of a combination of confidence and hunger.",
    author: "Arnold Palmer",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "I find that the harder I work, the more luck I seem to have.",
    author: "Thomas Jefferson",
  },
  {
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss",
  },
];

export default function QuoteGenerator({ interval = 30000 }) {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const changeQuote = () => {
      setFade(true);
      setTimeout(() => {
        const currentIndex = quotes.findIndex(
          (q) => q.text === currentQuote.text
        );
        const nextIndex = (currentIndex + 1) % quotes.length;
        setCurrentQuote(quotes[nextIndex]);
        setFade(false);
      }, 500); // Half of the fade duration
    };

    const timer = setInterval(changeQuote, interval);

    return () => clearInterval(timer);
  }, [currentQuote, interval]);

  return (
    <div
      className={`transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative w-full flex border border-zinc-500 p-3 rounded-xl flex-col">
        <p className="text-zinc-200 italic">"{currentQuote.text}"</p>
        <p className="text-zinc-400 text-right mt-2">— {currentQuote.author}</p>
      </div>
    </div>
  );
}
