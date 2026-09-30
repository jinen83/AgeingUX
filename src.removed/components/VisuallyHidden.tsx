import React from 'react';

export function VisuallyHidden({ as: Comp = 'span', children, className = '', ...rest }: any) {
  return (
    <Comp
      className={[
        'sr-only focus:not-sr-only focus:absolute focus:m-2 focus:rounded focus:bg-slate-800 focus:px-3 focus:py-2',
        className,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export default VisuallyHidden;
