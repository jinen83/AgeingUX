import React from 'react';
import { cx } from '../utils/a11y';

export type FieldProps = {
  id?: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string | null;
  children: (controlProps: { id: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean }) => React.ReactNode;
  className?: string;
};

export function Field({ id, label, required, hint, error, children, className }: FieldProps) {
  const inputId = React.useId();
  const finalId = id || inputId;
  const hintId = hint ? finalId + '-hint' : undefined;
  const errId = error ? finalId + '-error' : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx('w-full max-w-xs', className)}>
      <label htmlFor={finalId} className='block text-sm font-medium text-gray-200'>
        {label}{required ? ' *' : ''}
      </label>
      <div className='mt-1'>
        {children({ id: finalId, 'aria-describedby': describedBy, 'aria-invalid': !!error || undefined })}
      </div>
      {hint && !error && (
        <p id={hintId} className='mt-1 text-sm text-gray-400'>
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} role='alert' className='mt-1 text-sm text-red-300'>
          {error}
        </p>
      )}
    </div>
  );
}

export default Field;

