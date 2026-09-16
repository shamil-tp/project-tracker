import React, { useMemo } from 'react';
import { Users, GitBranch, ShieldCheck } from 'lucide-react';

const StatCard = ({ label, value, sub, icon: Icon, iconBg, iconColor }) => (
  <div className="nordic-card p-6 flex flex-col gap-4">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#71717A' }}>
        {label}
      </span>
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="w-4 h-4" strokeWidth={1.8} style={{ color: iconColor }} />
      </div>
    </div>

    <div>
      <p className="text-3xl font-bold tracking-tight" style={{ color: '#18181B' }}>
        {value}
      </p>
      <p className="text-xs mt-1" style={{ color: '#71717A' }}>
        {sub}
      </p>
    </div>
  </div>
);

const StatsOverview = ({ students = [] }) => {
  const stats = useMemo(() => {
    const total = students.length;

    const withGithub = students.filter((s) => {
      const url =
        s.githubUrl ||
        s['github url'] ||
        s['github-url'] ||
        s['GitHub Repository URL'];
      return Boolean(url && String(url).trim());
    }).length;

    const totalRoles = students.reduce((sum, s) => {
      const val =
        s.totalUsers ??
        s['Total Number of users:'] ??
        s['Total Number of users'] ??
        s['total-number-of-users'] ??
        0;
      return sum + (Number(val) || 0);
    }, 0);

    return [
    {
      label: 'Submissions',
      value: total,
      sub: 'Total student submissions',
      icon: Users,
      iconBg: 'rgba(79, 70, 229, 0.08)',
      iconColor: '#4F46E5', // Primary Accent: Deep Indigo
    },
    {
      label: 'Repositories',
      value: withGithub,
      sub: 'Linked GitHub repositories',
      icon: GitBranch,
      iconBg: 'rgba(14, 165, 233, 0.08)',
      iconColor: '#0EA5E9', // Secondary Accent: Sky Blue
    },
    {
      label: 'Roles Defined',
      value: totalRoles,
      sub: 'RBAC user levels configured',
      icon: ShieldCheck,
      iconBg: 'rgba(79, 70, 229, 0.08)',
      iconColor: '#4F46E5',
    },
    ];
  }, [students]);

  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
};

export default StatsOverview;
