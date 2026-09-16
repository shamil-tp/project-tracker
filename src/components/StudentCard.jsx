import React from 'react';
import { GitBranch, Users } from 'lucide-react';

const StudentCard = ({ student }) => {
  const techStack = Array.isArray(student["tech-stack"]) ? student["tech-stack"] : [];
  const addTech = Array.isArray(student["additional-technologies"]) ? student["additional-technologies"] : [];
  const allTags = [...techStack, ...addTech];

  return (
    <div className="glass bg-[#FFFFFF] rounded-2xl p-6 flex flex-col h-full hover:border-[#4F46E5]/40 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-[#18181B]">{student.name}</h3>
          <p className="text-sm text-[#71717A]">{student.rollno}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
          <Users className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-semibold text-gray-700">
            {student["total-number-of-users"]} Roles
          </span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-md font-semibold text-[#18181B] mb-2">{student["project-title"]}</h4>
        <p className="text-sm text-[#71717A] mb-4 line-clamp-3">
          {student["project-description"]}
        </p>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-sky-50 text-[#0EA5E9] border border-sky-100 rounded-md text-xs font-medium">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-6">
        {student["github-url"] ? (
          <a
            href={student["github-url"]}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#FAFAFA] hover:bg-gray-100 text-[#18181B] text-sm font-medium rounded-xl transition-colors border border-[#E4E4E7]"
          >
            <GitBranch className="w-4 h-4" />
            GitHub Repository
          </a>
        ) : (
          <div className="w-full text-center py-2 text-sm text-[#71717A] italic border border-transparent">
            No repository linked
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
