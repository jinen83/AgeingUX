import React from "react";
import { cx } from "../utils/a11y";

export type BylineProps = {
  author: string;
  className?: string;
};

export function Byline({ author, className }: BylineProps) {
  return (
    <span className={cx("font-medium text-gray-300", className)}>{author}</span>
  );
}

export default Byline;

