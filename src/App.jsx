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
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#18181B] p-4 md:p-8">
      <Header />
      
      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="space-y-8 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl border border-[#E4E4E7]"></div>
              ))}
            </div>
            <div className="h-20 bg-gray-200 rounded-2xl border border-[#E4E4E7]"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl border border-[#E4E4E7]"></div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="glass border-rose-500 bg-rose-50 p-8 rounded-2xl text-center">
            <h2 className="text-xl font-bold text-rose-700 mb-2">Error Loading Dashboard</h2>
            <p className="text-rose-600">{error}</p>
          </div>
        ) : (
          <>
            <StatsOverview students={students} />
            <FilterBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, idx) => (
                  <StudentCard key={idx} student={student} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-[#71717A]">
                  No projects found matching your search.
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
