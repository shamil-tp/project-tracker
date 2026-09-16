import React from 'react';
import { Users, Github, BookOpen } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="glass rounded-2xl p-6 flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default bg-[#FFFFFF]">
    <div className={`p-4 rounded-xl ${colorClass.bg}`}>
      <Icon className={`w-6 h-6 ${colorClass.text}`} />
    </div>
    <div>
      <p className="text-sm text-[#71717A] font-medium">{title}</p>
      <p className="text-2xl font-bold text-[#18181B]">{value}</p>
    </div>
  </div>
);

const StatsOverview = ({ students }) => {
  const total = students.length;
  const withGithub = students.filter(s => s["github-url"]).length;
  const totalUsersRoles = students.reduce((sum, s) => sum + (s["total-number-of-users"] || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Total Submissions" 
        value={total} 
        icon={Users}
        colorClass={{ bg: 'bg-indigo-50', text: 'text-[#4F46E5]' }}
      />
      <StatCard 
        title="Repositories Linked" 
        value={withGithub} 
        icon={Github}
        colorClass={{ bg: 'bg-sky-50', text: 'text-[#0EA5E9]' }}
      />
      <StatCard 
        title="Total Roles Modeled" 
        value={totalUsersRoles} 
        icon={BookOpen}
        colorClass={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }}
      />
    </div>
  );
};

export default StatsOverview;
