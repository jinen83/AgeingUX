import React from 'react';
import { ArticleLayout } from './layouts/ArticleLayout';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';

export default function App() {
  return (
    <ArticleLayout
      title='Age‑Friendly Dropdowns'
      author='AgeingUX'
      dateISO='2026-09-29'
      description='Scaffolded static blog shell with MDX support.'
    >
      <p>
        This scaffold provides Vite + React + TypeScript + Tailwind with MDX support
        for a single‑article site. Replace this body with your MDX content when ready.
      </p>
      <form className='mt-6 max-w-sm space-y-2' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='email' className='block text-sm text-gray-300'>Get updates</label>
        <Input id='email' type='email' placeholder='you@example.com' aria-label='Email address' />
        <Button type='submit' className='w-full'>Subscribe</Button>
      </form>
    </ArticleLayout>
  );
}
