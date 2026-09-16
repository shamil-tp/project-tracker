import React from 'react';
import { LayoutDashboard } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-[#1040C0] border-b-4 border-[#121212] mb-12 shadow-[0px_8px_0px_0px_#121212]">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-[#F0C020] p-3 border-4 border-[#121212] rounded-full shadow-[4px_4px_0px_0px_#121212]">
            <LayoutDashboard className="w-8 h-8 md:w-10 md:h-10 text-[#121212]" strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white drop-shadow-[4px_4px_0_#121212]">
              RBAC
            </h1>
            <h2 className="text-2xl md:text-4xl text-white font-bold uppercase tracking-widest mt-1 drop-shadow-[2px_2px_0_#121212]">
              Project Dashboard
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white border-4 border-[#121212] px-5 py-3 shadow-[4px_4px_0px_0px_#121212]">
          <div className="w-5 h-5 bg-[#D02020] border-2 border-[#121212] rounded-full animate-pulse"></div>
          <span className="text-base font-bold uppercase tracking-widest text-[#121212]">System Active</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
