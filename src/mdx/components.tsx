import React from "react";
import { cx } from "../utils/a11y";

// Lightweight MDX component mapping for consistent prose formatting
export const mdxComponents: Record<string, React.ComponentType<any>> = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className={cx("mt-8 text-3xl font-semibold text-white", props.className)} />
  ),
  h2: (props) => (
    <h2 {...props} className={cx("mt-8 text-2xl font-semibold text-white", props.className)} />
  ),
  h3: (props) => (
    <h3 {...props} className={cx("mt-6 text-xl font-semibold text-white", props.className)} />
  ),
  p: (props) => <p {...props} className={cx("my-4", props.className)} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} className={cx("text-teal-300 underline underline-offset-2 hover:text-teal-200", props.className)} />
  ),
  ul: (props) => <ul {...props} className={cx("my-4 list-disc pl-6", props.className)} />,
  ol: (props) => <ol {...props} className={cx("my-4 list-decimal pl-6", props.className)} />,
  code: (props) => (
    <code {...props} className={cx("rounded bg-surface-raised px-1 py-0.5 text-teal-200", props.className)} />
  ),
  pre: (props) => (
    <pre {...props} className={cx("overflow-x-auto rounded-lg bg-surface-raised p-4", props.className)} />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className={cx(
        "my-6 border-l-4 border-teal-600/60 bg-surface-raised/40 px-4 py-2 italic text-gray-200",
        props.className
      )}
    />
  ),
};

export default mdxComponents;

