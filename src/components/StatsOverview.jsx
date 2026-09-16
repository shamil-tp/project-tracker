import React from 'react';
import { Users, GitBranch, BookOpen } from 'lucide-react';

const cardStyles = [
  { bg: '#F0C020', text: '#121212', iconBg: 'white' },
  { bg: '#1040C0', text: 'white',   iconBg: '#F0C020' },
  { bg: '#D02020', text: 'white',   iconBg: 'white' },
];

const StatCard = ({ title, value, icon: Icon, colors }) => (
  <div
    className="flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
    style={{
      backgroundColor: colors.bg,
      border: '4px solid #121212',
      boxShadow: '8px 8px 0px 0px #121212',
      padding: '32px',
    }}
  >
    <div className="flex justify-between items-start mb-6">
      <h3
        className="text-xl md:text-2xl font-bold uppercase tracking-wider"
        style={{
          color: colors.text,
          borderBottom: `4px solid ${colors.text}`,
          paddingBottom: '8px',
        }}
      >
        {title}
      </h3>
      <div
        style={{
          backgroundColor: colors.iconBg,
          border: '4px solid #121212',
          boxShadow: '4px 4px 0px 0px #121212',
          padding: '12px',
          borderRadius: '9999px',
        }}
      >
        <Icon className="w-7 h-7" strokeWidth={3} style={{ color: '#121212' }} />
      </div>
    </div>
    <p
      className="text-7xl md:text-8xl font-black tracking-tighter"
      style={{ color: colors.text, textShadow: `4px 4px 0 ${colors.text === 'white' ? '#0008' : '#0002'}` }}
    >
      {value}
    </p>
  </div>
);

const StatsOverview = ({ students }) => {
  const total       = students.length;
  const withGithub  = students.filter(s => s['github-url']).length;
  const totalRoles  = students.reduce((sum, s) => sum + (s['total-number-of-users'] || 0), 0);

  const stats = [
    { title: 'Submissions',  value: total,       icon: Users },
    { title: 'Repositories', value: withGithub,  icon: GitBranch },
    { title: 'Roles Defined',value: totalRoles,  icon: BookOpen },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
      {stats.map((s, i) => (
        <StatCard key={s.title} {...s} colors={cardStyles[i]} />
      ))}
    </div>
  );
};

export default StatsOverview;
