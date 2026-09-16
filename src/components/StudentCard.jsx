import React from 'react';
import { GitBranch, Users, ArrowUpRight } from 'lucide-react';

const StudentCard = ({ student }) => {
  const techStack = Array.isArray(student['tech-stack']) ? student['tech-stack'] : [];
  const addTech = Array.isArray(student['additional-technologies']) ? student['additional-technologies'] : [];
  const allTags = [...techStack, ...addTech];

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
              {student.name}
            </h3>
            <p
              className="text-xs font-mono font-medium mt-0.5"
              style={{ color: '#71717A' }}
            >
              {student.rollno}
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
            <span>{student['total-number-of-users']} roles</span>
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
            {student['project-title']}
          </h4>
          <p
            className="text-xs leading-relaxed line-clamp-3"
            style={{ color: '#71717A' }}
          >
            {student['project-description']}
          </p>
        </div>

        {/* Secondary Accent Tags: Sky Blue (#0EA5E9) for tech stack & additional tech */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {allTags.map((tech, i) => (
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
        {student['github-url'] ? (
          <a
            href={student['github-url']}
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
};

export default StudentCard;
