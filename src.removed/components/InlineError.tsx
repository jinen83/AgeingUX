import React from 'react';
import { cx } from '../utils/a11y';

export type InlineErrorProps = {
  id?: string;
  message?: string | null;
  className?: string;
};

export function InlineError({ id, message, className }: InlineErrorProps) {
  if (!message) return null;
  return (
    <p id={id} role='alert' className={cx('mt-1 text-sm text-red-300', className)}>
      {message}
    </p>
  );
}

export default InlineError;

