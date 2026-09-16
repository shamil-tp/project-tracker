import React from 'react';
import { GitBranch, Users, ArrowUpRight } from 'lucide-react';

const StudentCard = React.memo(({ student }) => {
  // Gracefully support normalized model or raw keys
  const name = student.name || student['Name :'] || student['Name:'] || student['Full Name'] || 'Student';
  const rollno = student.rollno ?? student['Roll No:'] ?? student['Roll No'] ?? student['Roll Number'] ?? student['Roll No: [eg- 26PSCA01]'] ?? 'N/A';
  const projectTitle = student.projectTitle || student['Project Title'] || student['project-title'] || 'Untitled Project';
  const projectDescription = student.projectDescription || student['Project Description'] || student['project-description'] || '';
  const totalUsers = student.totalUsers ?? student['Total Number of users:'] ?? student['total-number-of-users'] ?? 0;

  // GitHub URL with safe protocol handling (prepends https:// if missing)
  let githubUrl = student.githubUrl || student['github url'] || student['github-url'] || student['GitHub Repository URL'] || '';
  if (githubUrl && !githubUrl.startsWith('http://') && !githubUrl.startsWith('https://')) {
    githubUrl = `https://${githubUrl}`;
  }

  // Tags: support parsed array or comma-separated string
  let tags = [];
  if (Array.isArray(student.tags)) {
    tags = student.tags;
  } else {
    const rawTech = student['Additional Technologies and Tech Stack Used:'] || student['Tech Stack'] || student['tech-stack'] || '';
    if (typeof rawTech === 'string' && rawTech.trim()) {
      tags = rawTech.split(',').map(t => t.trim()).filter(Boolean);
    } else if (Array.isArray(rawTech)) {
      tags = [...rawTech];
    }
    if (Array.isArray(student['additional-technologies'])) {
      tags = [...tags, ...student['additional-technologies']];
    }
  }

  return (
    <article className="nordic-card p-6 flex flex-col justify-between h-full">
      <div>
        {/* Top Header Row: Name, Roll Number, User Roles Pill */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3
              className="text-base font-semibold tracking-tight leading-snug"
              style={{ color: '#18181B' }}
            >
              {name}
            </h3>
            <p
              className="text-xs font-mono font-medium mt-0.5"
              style={{ color: '#71717A' }}
            >
              Roll No: {rollno}
            </p>
          </div>

          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shrink-0"
            style={{
              backgroundColor: '#FAFAFA',
              border: '1px solid #E4E4E7',
              color: '#71717A',
            }}
          >
            <Users className="w-3.5 h-3.5" strokeWidth={1.8} style={{ color: '#71717A' }} />
            <span>{totalUsers} {totalUsers === 1 ? 'role' : 'roles'}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-4" style={{ borderTop: '1px solid #E4E4E7' }} />

        {/* Project Title & Description */}
        <div className="space-y-2 mb-4">
          <h4
            className="text-sm font-semibold tracking-tight"
            style={{ color: '#18181B' }}
          >
            {projectTitle}
          </h4>
          {projectDescription ? (
            <p
              className="text-xs leading-relaxed line-clamp-3"
              style={{ color: '#71717A' }}
            >
              {projectDescription}
            </p>
          ) : (
            <p className="text-xs italic" style={{ color: '#A1A1AA' }}>
              No description provided.
            </p>
          )}
        </div>

        {/* Secondary Accent Tags: Sky Blue (#0EA5E9) for tech stack & additional tech */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {tags.map((tech, i) => (
              <span
                key={i}
                className="text-xs font-medium px-2 py-0.5 rounded-md inline-flex items-center"
                style={{
                  backgroundColor: 'rgba(14, 165, 233, 0.08)',
                  color: '#0284C7',
                  border: '1px solid rgba(14, 165, 233, 0.2)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Button: Primary Accent (#4F46E5 Deep Indigo) */}
      <div className="pt-2">
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nordic-btn-primary w-full"
          >
            <GitBranch className="w-4 h-4" strokeWidth={1.8} />
            <span>View GitHub Repository</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-75" strokeWidth={1.8} />
          </a>
        ) : (
          <div
            className="w-full text-center py-2 rounded-lg text-xs font-medium"
            style={{
              color: '#71717A',
              backgroundColor: '#FAFAFA',
              border: '1px dashed #E4E4E7',
            }}
          >
            No repository linked
          </div>
        )}
      </div>
    </article>
  );
});

export default StudentCard;
