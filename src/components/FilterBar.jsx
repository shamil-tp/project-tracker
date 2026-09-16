import React from 'react';
import { Search } from 'lucide-react';

const FilterBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div
      className="mb-16 relative overflow-hidden"
      style={{ backgroundColor: 'white', border: '4px solid #121212', boxShadow: '8px 8px 0px 0px #121212' }}
    >
      {/* Decorative circle */}
      <div
        className="absolute -right-10 -top-10 w-36 h-36 rounded-full pointer-events-none"
        style={{ backgroundColor: '#F0F0F0', border: '4px solid #121212', opacity: 0.5 }}
      />
      {/* Decorative rotated square */}
      <div
        className="absolute -left-14 -bottom-14 w-44 h-44 pointer-events-none rotate-45"
        style={{ backgroundColor: '#D02020', border: '4px solid #121212', opacity: 0.15 }}
      />

      <div className="relative flex flex-col md:flex-row gap-6 items-center p-6 md:p-8">
        <span
          className="hidden lg:block font-black uppercase tracking-widest text-2xl whitespace-nowrap"
          style={{ color: '#121212' }}
        >
          Filter Directory
        </span>

        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 w-7 h-7 pointer-events-none"
            strokeWidth={3}
            style={{ color: '#121212' }}
          />
          <input
            type="text"
            placeholder="Search projects, roles, tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bauhaus-input"
            style={{ paddingLeft: '56px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
