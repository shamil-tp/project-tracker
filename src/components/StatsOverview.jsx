import React from 'react';
import { Users, Github, BookOpen } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, bgClass, textColorClass, iconBgClass }) => (
  <div className={`bauhaus-card p-6 md:p-8 flex flex-col justify-between ${bgClass} group`}>
    <div className="flex justify-between items-start mb-6">
      <h3 className={`text-xl md:text-2xl font-bold uppercase tracking-wider ${textColorClass} border-b-4 border-current pb-2 inline-block`}>
        {title}
      </h3>
      <div className={`border-4 border-[#121212] p-3 shadow-[4px_4px_0px_0px_#121212] ${iconBgClass} rounded-full group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200`}>
        <Icon className="w-8 h-8 text-[#121212]" strokeWidth={3} />
      </div>
    </div>
    <div>
      <p className={`text-7xl md:text-8xl font-black ${textColorClass} tracking-tighter drop-shadow-[4px_4px_0_#121212]`}>
        {value}
      </p>
    </div>
  </div>
);

const StatsOverview = ({ students }) => {
  const total = students.length;
  const withGithub = students.filter(s => s["github-url"]).length;
  const totalUsersRoles = students.reduce((sum, s) => sum + (s["total-number-of-users"] || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
      <StatCard 
        title="Submissions" 
        value={total} 
        icon={Users}
        bgClass="bg-[#F0C020]" 
        textColorClass="text-[#121212]"
        iconBgClass="bg-white"
      />
      <StatCard 
        title="Repositories" 
        value={withGithub} 
        icon={Github}
        bgClass="bg-[#1040C0]" 
        textColorClass="text-white"
        iconBgClass="bg-[#F0C020]"
      />
      <StatCard 
        title="Roles Defined" 
        value={totalUsersRoles} 
        icon={BookOpen}
        bgClass="bg-[#D02020]" 
        textColorClass="text-white"
        iconBgClass="bg-white"
      />
    </div>
  );
};

export default StatsOverview;
