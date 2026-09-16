import React from 'react';
import { Search, Filter } from 'lucide-react';

const FilterBar = ({ searchQuery, setSearchQuery, filterStatus, setFilterStatus }) => {
  return (
    <div className="glass bg-[#FFFFFF] p-4 rounded-2xl flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717A]" />
        <input
          type="text"
          placeholder="Search by student, roll number, tech stack..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#FAFAFA] border border-[#E4E4E7] rounded-xl py-3 pl-12 pr-4 text-[#18181B] placeholder-[#71717A] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
        />
      </div>
      <div className="relative md:w-64">
        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717A]" />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full bg-[#FAFAFA] border border-[#E4E4E7] rounded-xl py-3 pl-12 pr-10 text-[#18181B] appearance-none focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Schema">Schema/Auth Stage</option>
          <option value="Middleware">Middleware/Routing Stage</option>
          <option value="Complete">Integrated/Complete</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-[#71717A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
