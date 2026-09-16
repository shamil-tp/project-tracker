import React from 'react';
import { LayoutDashboard } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass sticky top-0 z-50 mb-8 rounded-b-2xl border-t-0 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-xl">
            <LayoutDashboard className="w-6 h-6 text-[#4F46E5]" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-[#18181B]">
            RBAC Project Evaluation Tracker
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm text-[#71717A] font-medium">Live System</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
