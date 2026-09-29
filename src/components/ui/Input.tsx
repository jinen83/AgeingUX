import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...rest }: InputProps) => (
  <input
    className={['w-full rounded-md border border-slate-700 bg-surface-raised px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600/40', className].filter(Boolean).join(' ')}
    {...rest}
  />
);
