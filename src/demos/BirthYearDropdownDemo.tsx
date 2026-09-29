import React from 'react';
import Combobox from '../components/Combobox';
import { yearsDescending } from '../utils/range';
import './demos.css';

export function BirthYearDropdownDemo() {
  const currentYear = new Date().getFullYear();
  const years = React.useMemo(() => yearsDescending(currentYear, 1900), [currentYear]);
  const [year, setYear] = React.useState<number | null>(null);

  return (
    <figure className='demo-card'>
      <figcaption className='mb-3 text-sm text-gray-400'>
        Current-year-first dropdown. Use Arrow keys, Home/End, Enter.
      </figcaption>
      <div className='demo-row'>
        <Combobox<number>
          label='Birth year'
          items={years}
          value={year}
          onChange={setYear}
          itemToString={(n: number) => String(n)}
          placeholder='Select year'
          initialActiveIndex={0}
        />
        <output aria-live='polite' className='text-sm text-gray-400'>
          {year ? 'Selected: ' + year : 'No year selected'}
        </output>
      </div>
    </figure>
  );
}

export default BirthYearDropdownDemo;
