import React from 'react';
import { Search } from 'lucide-react';

const FilterBar = ({ searchQuery, setSearchQuery }) => (
  <section className="mb-8">
    <div className="relative max-w-xl">
      <Search
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        strokeWidth={1.8}
        style={{ color: '#71717A' }}
      />
      <input
        type="text"
        placeholder="Search by student name, roll number, project title, or tech stack..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="nordic-input"
      />
    </div>
  </section>
);

export default FilterBar;
