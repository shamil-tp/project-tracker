import React from 'react';
import { GitBranch, Users } from 'lucide-react';

const GeometricDecoration = ({ index }) => {
  // Rotate through 3 decorative styles based on index
  const styles = [
    <div key="1" className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-[#D02020] border-4 border-[#121212] shadow-[4px_4px_0px_0px_#121212] z-10"></div>,
    <div key="2" className="absolute -top-4 -right-4 w-12 h-12 bg-[#1040C0] border-4 border-[#121212] rotate-45 shadow-[4px_4px_0px_0px_#121212] z-10"></div>,
    <div key="3" className="absolute -top-5 -right-5 w-0 h-0 border-l-[24px] border-l-transparent border-b-[40px] border-b-[#F0C020] border-r-[24px] border-r-transparent drop-shadow-[4px_4px_0_#121212] z-10">
      {/* SVG equivalent for triangle with border to ensure stroke is perfect */}
      <svg className="absolute -left-[28px] -top-[4px] w-[56px] h-[48px]" overflow="visible">
        <polygon points="28,0 0,44 56,44" fill="#F0C020" stroke="#121212" strokeWidth="4" />
      </svg>
    </div>
  ];
  return styles[index % 3];
};

const StudentCard = ({ student, index }) => {
  const techStack = Array.isArray(student["tech-stack"]) ? student["tech-stack"] : [];
  const addTech = Array.isArray(student["additional-technologies"]) ? student["additional-technologies"] : [];
  const allTags = [...techStack, ...addTech];

  return (
    <div className="bauhaus-card p-6 md:p-8 flex flex-col h-full relative group">
      <GeometricDecoration index={index} />
      
      <div className="flex flex-col gap-4 mb-6 border-b-4 border-[#121212] pb-6">
        <div className="flex justify-between items-start">
          <h3 className="text-3xl font-black text-[#121212] uppercase leading-[0.9] tracking-tighter">{student.name}</h3>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-xl font-bold tracking-widest text-[#1040C0] uppercase bg-[#F0F0F0] px-2 py-1 border-2 border-[#121212]">
            {student.rollno}
          </p>
          <div className="flex items-center gap-2 bg-[#F0C020] px-3 py-2 border-2 border-[#121212] shadow-[4px_4px_0px_0px_#121212]">
            <Users className="w-6 h-6 text-[#121212]" strokeWidth={3} />
            <span className="text-sm font-black tracking-widest text-[#121212]">
              {student["total-number-of-users"]} USERS
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8 flex-grow">
        <h4 className="text-2xl font-black text-[#121212] uppercase mb-4 leading-tight">{student["project-title"]}</h4>
        <p className="text-lg font-medium text-[#121212] mb-8 leading-relaxed border-l-4 border-[#D02020] pl-4">
          {student["project-description"]}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {allTags.map((tech, i) => (
            <span key={i} className="px-3 py-1.5 bg-white text-[#121212] border-2 border-[#121212] shadow-[2px_2px_0px_0px_#121212] text-sm font-bold uppercase tracking-wider hover:bg-[#121212] hover:text-white transition-colors duration-200">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4">
        {student["github-url"] ? (
          <a
            href={student["github-url"]}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#1040C0] text-white hover:bg-[#D02020] bauhaus-button text-lg"
          >
            <GitBranch className="w-6 h-6" strokeWidth={3} />
            VIEW REPOSITORY
          </a>
        ) : (
          <div className="w-full text-center py-4 text-lg font-black uppercase tracking-widest text-[#121212] border-4 border-dashed border-[#121212] bg-[#F0F0F0]">
            NO REPOSITORY LINKED
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
