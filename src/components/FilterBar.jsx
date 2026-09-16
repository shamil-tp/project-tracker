import React from 'react';
import { Search } from 'lucide-react';

const FilterBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="glass bg-[#FFFFFF] p-4 rounded-2xl flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717A]" />
        <input
          type="text"
          placeholder="Search by student, roll number, project title, or tech stack..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#FAFAFA] border border-[#E4E4E7] rounded-xl py-3 pl-12 pr-4 text-[#18181B] placeholder-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
        />
      </div>
    </div>
  );
};

export default FilterBar;
