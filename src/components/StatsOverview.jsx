import React from 'react';
import { Users, CheckCircle2, AlertCircle } from 'lucide-react';

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
  const completed = students.filter(s => s["Implementation Status"]?.toLowerCase().includes("complete") || s["Implementation Status"]?.toLowerCase().includes("integrated")).length;
  const blocked = students.filter(s => s["Current Blockers"] && s["Current Blockers"].trim().length > 0 && s["Current Blockers"].toLowerCase() !== "none").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Total Submissions" 
        value={total} 
        icon={Users}
        colorClass={{ bg: 'bg-indigo-50', text: 'text-[#4F46E5]' }}
      />
      <StatCard 
        title="Completed" 
        value={completed} 
        icon={CheckCircle2}
        colorClass={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }}
      />
      <StatCard 
        title="Blocked / Stuck" 
        value={blocked} 
        icon={AlertCircle}
        colorClass={{ bg: 'bg-rose-50', text: 'text-rose-600' }}
      />
    </div>
  );
};

export default StatsOverview;
