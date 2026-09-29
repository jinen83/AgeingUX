import React, { PropsWithChildren } from 'react';
import { formatDate } from '../utils/date';

export type ArticleLayoutProps = PropsWithChildren<{
  title: string;
  author: string;
  dateISO: string; // YYYY-MM-DD
  description?: string;
}>;

export function ArticleLayout({ title, author, dateISO, description, children }: ArticleLayoutProps) {
  return (
    <div>
      <a href='#content' className='sr-only focus:not-sr-only focus:absolute focus:m-2 focus:rounded focus:bg-slate-800 focus:px-3 focus:py-2'>Skip to content</a>
      <header className='border-b border-slate-800 bg-surface/60 backdrop-blur'>
        <div className='container-app py-4'>
          <div className='flex items-center justify-between'>
            <div className='text-sm text-gray-400'>AgeingUX</div>
            <nav className='text-sm text-gray-400'>
              <a href='#' className='hover:text-white'>Home</a>
            </nav>
          </div>
          <h1 className='mt-3 text-3xl font-semibold text-white'>{title}</h1>
          <p className='mt-1 text-sm text-gray-400'>By {author} • <time dateTime={dateISO}>{formatDate(dateISO)}</time></p>
          {description ? <p className='mt-3 max-w-prose text-gray-300'>{description}</p> : null}
        </div>
      </header>
      <main id='content' className='container-app prose py-8'>
        {children}
      </main>
      <footer className='border-t border-slate-800 py-8 text-center text-xs text-gray-500'>
        © {new Date().getFullYear()} AgeingUX. All rights reserved.
      </footer>
    </div>
  );
}
