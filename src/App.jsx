import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import FilterBar from './components/FilterBar';
import StudentCard from './components/StudentCard';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

  // Simulated fetch from Google Apps Script endpoint
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockData = [
          {
            "name": "John Doe",
            "rollno": "CS2026-042",
            "project-title": "Hospital Management RBAC",
            "project-description": "A comprehensive web application designed to manage hospital resources, track patient records, and coordinate staff schedules securely with multi-level role access.",
            "github-url": "https://github.com/example/rbac-app",
            "total-number-of-users": 4,
            "tech-stack": ["React", "Express", "MySQL", "JWT"],
            "additional-technologies": ["Tailwind CSS", "Docker"]
          },
          {
            "name": "Sarah Connor",
            "rollno": "CS2026-015",
            "project-title": "E-Learning Platform",
            "project-description": "An interactive online learning portal that allows students to enroll in courses and instructors to upload materials and grade assignments.",
            "github-url": "https://github.com/example/elearning-rbac",
            "total-number-of-users": 3,
            "tech-stack": ["React", "Node.js", "MongoDB", "JWT"],
            "additional-technologies": ["Material UI", "Redis"]
          },
          {
            "name": "Alex Chen",
            "rollno": "CS2026-088",
            "project-title": "Inventory Management System",
            "project-description": "A robust system for retail businesses to track stock levels, manage suppliers, and process orders with distinct permissions for managers and floor staff.",
            "github-url": "https://github.com/example/inventory",
            "total-number-of-users": 3,
            "tech-stack": ["React", "Express", "PostgreSQL"],
            "additional-technologies": ["Tailwind CSS", "TypeScript"]
          }
        ];
        
        setStudents(mockData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch students:", err);
        setError("Failed to load student data. Please try again later.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const query = searchQuery.toLowerCase();
      
      const allTags = [...(student["tech-stack"] || []), ...(student["additional-technologies"] || [])].join(' ').toLowerCase();

      return (
        student.name?.toLowerCase().includes(query) ||
        student.rollno?.toLowerCase().includes(query) ||
        student["project-title"]?.toLowerCase().includes(query) ||
        allTags.includes(query)
      );
    });
  }, [students, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F0F0F0] font-sans pb-16">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8">
        {loading ? (
          <div className="space-y-12 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-40 bg-gray-300 border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212]"></div>
              ))}
            </div>
            <div className="h-24 bg-gray-300 border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212]"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 bg-gray-300 border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212]"></div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="bg-[#D02020] border-4 border-[#121212] shadow-[8px_8px_0px_0px_#121212] p-8 text-center text-white">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Error Loading Data</h2>
            <p className="text-lg font-bold">{error}</p>
          </div>
        ) : (
          <>
            <StatsOverview students={students} />
            <FilterBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, idx) => (
                  <StudentCard key={idx} index={idx} student={student} />
                ))
              ) : (
                <div className="col-span-full py-16 bg-white border-4 border-[#121212] text-center shadow-[8px_8px_0px_0px_#121212]">
                  <h3 className="text-2xl font-bold uppercase tracking-widest text-[#121212]">No Projects Found</h3>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
