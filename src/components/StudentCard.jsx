import React from 'react';
import { GitBranch, Users } from 'lucide-react';

const decorations = [
  // Red circle
  <div
    key="circle"
    className="absolute -top-4 -right-4 w-12 h-12 rounded-full z-10"
    style={{ backgroundColor: '#D02020', border: '4px solid #121212', boxShadow: '4px 4px 0 #121212' }}
  />,
  // Blue rotated square
  <div
    key="square"
    className="absolute -top-4 -right-4 w-12 h-12 rotate-45 z-10"
    style={{ backgroundColor: '#1040C0', border: '4px solid #121212', boxShadow: '4px 4px 0 #121212' }}
  />,
  // Yellow triangle via SVG
  <svg
    key="triangle"
    className="absolute -top-5 -right-5 z-10"
    width="56" height="48"
    viewBox="0 0 56 48"
    overflow="visible"
  >
    <polygon points="28,0 0,44 56,44" fill="#F0C020" stroke="#121212" strokeWidth="4" />
  </svg>,
];

const StudentCard = ({ student, index }) => {
  const techStack = Array.isArray(student['tech-stack'])               ? student['tech-stack']               : [];
  const addTech   = Array.isArray(student['additional-technologies'])  ? student['additional-technologies']  : [];
  const allTags   = [...techStack, ...addTech];

  return (
    <div className="bauhaus-card flex flex-col h-full relative">
      {/* Geometric corner decoration */}
      {decorations[index % 3]}

      {/* ── Header block ── */}
      <div
        className="p-6 md:p-8"
        style={{ borderBottom: '4px solid #121212' }}
      >
        <h3
          className="text-3xl font-black uppercase tracking-tighter leading-none mb-3"
          style={{ color: '#121212' }}
        >
          {student.name}
        </h3>

        <div className="flex items-center justify-between gap-4">
          {/* Roll number */}
          <span
            className="text-base font-bold uppercase tracking-widest px-2 py-1"
            style={{
              color: '#1040C0',
              backgroundColor: '#F0F0F0',
              border: '2px solid #121212',
            }}
          >
            {student.rollno}
          </span>

          {/* User count badge */}
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{
              backgroundColor: '#F0C020',
              border: '2px solid #121212',
              boxShadow: '3px 3px 0 #121212',
            }}
          >
            <Users className="w-5 h-5" strokeWidth={3} style={{ color: '#121212' }} />
            <span className="text-sm font-black uppercase tracking-widest" style={{ color: '#121212' }}>
              {student['total-number-of-users']} Users
            </span>
          </div>
        </div>
      </div>

      {/* ── Body block ── */}
      <div className="p-6 md:p-8 flex-grow flex flex-col gap-6">
        <h4
          className="text-2xl font-black uppercase leading-tight"
          style={{ color: '#121212' }}
        >
          {student['project-title']}
        </h4>

        <p
          className="text-base font-medium leading-relaxed"
          style={{
            color: '#121212',
            borderLeft: '4px solid #D02020',
            paddingLeft: '16px',
          }}
        >
          {student['project-description']}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {allTags.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1.5 text-sm font-bold uppercase tracking-wider transition-colors duration-200 cursor-default"
              style={{
                backgroundColor: 'white',
                color: '#121212',
                border: '2px solid #121212',
                boxShadow: '2px 2px 0 #121212',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#121212';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#121212';
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ── Footer / CTA ── */}
      <div className="p-6 md:p-8 pt-0 mt-auto">
        {student['github-url'] ? (
          <a
            href={student['github-url']}
            target="_blank"
            rel="noopener noreferrer"
            className="bauhaus-button w-full py-4 text-lg text-white"
            style={{ backgroundColor: '#1040C0' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#D02020')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1040C0')}
          >
            <GitBranch className="w-6 h-6" strokeWidth={3} />
            View Repository
          </a>
        ) : (
          <div
            className="w-full text-center py-4 text-base font-black uppercase tracking-widest"
            style={{
              color: '#121212',
              border: '4px dashed #121212',
              backgroundColor: '#F0F0F0',
            }}
          >
            No Repository Linked
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
