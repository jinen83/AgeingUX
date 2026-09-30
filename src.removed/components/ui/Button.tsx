import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, children, ...rest }: ButtonProps) => (
  <button
    className={['inline-flex items-center justify-center rounded-md border border-transparent bg-teal-500 px-3 py-2 text-sm font-medium text-black shadow hover:bg-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 disabled:opacity-50', className].filter(Boolean).join(' ')}
    {...rest}
  >
    {children}
  </button>
);
