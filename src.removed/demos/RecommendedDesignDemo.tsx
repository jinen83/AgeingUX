import React from 'react';
import '../styles/recommended.css';
import './demos.css';
import YearInput from '../components/YearInput';
import DecadeChips from '../components/DecadeChips';

export function RecommendedDesignDemo() {
  const currentYear = new Date().getFullYear();
  const minYear = 1900;
  const [year, setYear] = React.useState<number | null>(null);
  const [decadeStart, setDecadeStart] = React.useState<number | null>(null);

  const from = decadeStart ?? minYear;
  const to = decadeStart != null ? decadeStart + 9 : currentYear;

  return (
    <figure className='demo-card'>
      <figcaption className='mb-3 text-sm text-gray-400'>
        Type-ahead year input with inline validation and decade filters.
      </figcaption>

      <div className='flex flex-col gap-3'>
        <DecadeChips minYear={minYear} maxYear={currentYear} value={decadeStart} onChange={setDecadeStart} />

        <div className='demo-row'>
          <YearInput
            id='recommended-year'
            label='Birth year'
            value={year}
            onChange={setYear}
            minYear={minYear}
            maxYear={currentYear}
            from={from}
            to={to}
            placeholder='YYYY'
          />
          <output aria-live='polite' className='text-sm text-gray-400'>
            {year ? 'Selected: ' + year : 'No year selected'}
          </output>
        </div>
      </div>
    </figure>
  );
}

export default RecommendedDesignDemo;

