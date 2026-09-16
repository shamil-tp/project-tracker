import React, { useState } from 'react';
import { GitBranch, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const StatusBadge = ({ status }) => {
  let config = { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
  
  const s = status?.toLowerCase() || '';
  if (s.includes('schema') || s.includes('auth')) {
    config = { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
  } else if (s.includes('middleware') || s.includes('routing') || s.includes('route')) {
    config = { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' };
  } else if (s.includes('complete') || s.includes('integrated') || s.includes('testing')) {
    config = { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border} whitespace-nowrap`}>
      {status || 'Unknown Status'}
    </span>
  );
};

const StudentCard = ({ student }) => {
  const [expanded, setExpanded] = useState(false);
  
  const hasBlockers = student["Current Blockers"] && student["Current Blockers"].trim().length > 0 && student["Current Blockers"].toLowerCase() !== "none";

  return (
    <div className="glass bg-[#FFFFFF] rounded-2xl p-6 flex flex-col h-full hover:border-[#4F46E5]/40 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-[#18181B]">{student["Full Name"]}</h3>
          <p className="text-sm text-[#71717A]">{student["Roll Number"]}</p>
        </div>
        <StatusBadge status={student["Implementation Status"]} />
      </div>

      <div className="mb-4">
        <h4 className="text-md font-semibold text-[#18181B] mb-2">{student["Project Title"]}</h4>
        <div className="flex flex-wrap gap-2">
          {student["Tech Stack"]?.split(',').map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-sky-50 text-[#0EA5E9] border border-sky-100 rounded-md text-xs font-medium">
              {tech.trim()}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-auto mb-6">
        {student["GitHub Repository URL"] && (
          <a
            href={student["GitHub Repository URL"]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-[#FAFAFA] hover:bg-gray-100 text-[#18181B] text-sm font-medium rounded-xl transition-colors border border-[#E4E4E7]"
          >
            <GitBranch className="w-4 h-4" />
            Repo
          </a>
        )}
        {student["Hosted Live Demo URL"] && (
          <a
            href={student["Hosted Live Demo URL"]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Demo
          </a>
        )}
      </div>

      <div className="border-t border-[#E4E4E7] pt-4">
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-sm font-medium text-[#71717A] hover:text-[#18181B] transition-colors"
        >
          <span>View Details</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {expanded && (
          <div className="mt-4 space-y-4 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <span className="text-[#71717A] block mb-1 font-medium">Implemented Roles:</span>
              <p className="text-[#18181B] bg-[#FAFAFA] p-3 rounded-xl border border-[#E4E4E7]">
                {student["Implemented Roles"] || 'N/A'}
              </p>
            </div>
            <div>
              <span className="text-[#71717A] block mb-1 font-medium">Working Features:</span>
              <p className="text-[#18181B] bg-[#FAFAFA] p-3 rounded-xl border border-[#E4E4E7]">
                {student["Working Features"] || 'N/A'}
              </p>
            </div>
            {hasBlockers && (
              <div>
                <span className="text-rose-600 block mb-1 font-medium">Current Blockers:</span>
                <p className="text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200">
                  {student["Current Blockers"]}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
