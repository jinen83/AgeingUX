import React from 'react';
import AnchoredList from '../components/AnchoredList';
import '../styles/anchored.css';
import './demos.css';

export function AgeAnchoredSelectorDemo() {
  const [age, setAge] = React.useState<number | null>(null);

  return (
    <figure className='demo-card'>
      <figcaption className='mb-3 text-sm text-gray-400'>
        Age-anchored selector. Start at 30; Arrow keys select; Enter confirms.
      </figcaption>
      <div className='demo-row'>
        <div className='w-56'>
          <AnchoredList value={age} onChange={setAge} anchor={30} minAge={18} maxAge={100} />
        </div>
        <output aria-live='polite' className='text-sm text-gray-400'>
          {age == null ? 'No age selected' : 'Selected: ' + age}
        </output>
      </div>
    </figure>
  );
}

export default AgeAnchoredSelectorDemo;
