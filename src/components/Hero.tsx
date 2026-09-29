import React from "react";
import { cx } from "../utils/a11y";
import Byline from "./Byline";
import DateStamp from "./DateStamp";

export type HeroProps = {
  title: string;
  deck?: string;
  author: string;
  dateISO: string; // YYYY-MM-DD
  className?: string;
};

export function Hero({ title, deck, author, dateISO, className }: HeroProps) {
  return (
    <header className={cx(
      "border-b border-slate-800 bg-surface/60 backdrop-blur",
      className
    )}>
      <div className="container-app py-8">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
        {deck ? (
          <p className="mt-3 max-w-prose text-base text-gray-300 sm:text-lg">{deck}</p>
        ) : null}
        <p className="mt-4 text-sm text-gray-400">
          By <Byline author={author} />
          <span className="mx-2" aria-hidden>•</span>
          <DateStamp dateISO={dateISO} />
        </p>
      </div>
    </header>
  );
}

export default Hero;

