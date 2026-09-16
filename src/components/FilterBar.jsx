import React from 'react';
import { Search } from 'lucide-react';

const FilterBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-white bauhaus-border bauhaus-shadow-lg p-6 md:p-8 mb-16 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full border-4 border-[#121212] bg-[#F0F0F0] pointer-events-none z-0"></div>
      <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-[#D02020] border-4 border-[#121212] rotate-45 pointer-events-none z-0 opacity-20"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
        <label className="font-black uppercase tracking-widest text-2xl whitespace-nowrap hidden lg:block text-[#121212]">
          FILTER DIRECTORY
        </label>
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 text-[#121212] group-focus-within:text-[#1040C0] transition-colors duration-200" strokeWidth={3} />
          <input
            type="text"
            placeholder="SEARCH PROJECTS, ROLES, TECH..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bauhaus-input pl-16 py-4 text-xl uppercase font-bold tracking-wider"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
