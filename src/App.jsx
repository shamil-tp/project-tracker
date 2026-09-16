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
  const [filterStatus, setFilterStatus] = useState('All');

  // Simulated fetch from Google Apps Script endpoint
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockData = [
          {
            "Timestamp": "2026-09-16T08:00:00Z",
            "Full Name": "John Doe",
            "Roll Number": "CS2026-042",
            "Email Address": "john@university.edu",
            "Project Title": "Hospital Management RBAC",
            "GitHub Repository URL": "https://github.com/example/rbac-app",
            "Hosted Live Demo URL": "https://rbac-demo.vercel.app",
            "Tech Stack": "React, Express, MySQL, JWT, Tailwind",
            "Implemented Roles": "Admin, Doctor, Patient, Desk Staff",
            "Implementation Status": "Middleware & Role Checking Complete",
            "Working Features": "JWT auth flow working, route guards in React operational.",
            "Current Blockers": "Struggling with complex MySQL JOIN queries for permission mapping."
          },
          {
            "Timestamp": "2026-09-16T09:15:00Z",
            "Full Name": "Sarah Connor",
            "Roll Number": "CS2026-015",
            "Email Address": "sarah@university.edu",
            "Project Title": "E-Learning Platform",
            "GitHub Repository URL": "https://github.com/example/elearning-rbac",
            "Hosted Live Demo URL": "",
            "Tech Stack": "React, Node.js, MongoDB, JWT",
            "Implemented Roles": "Admin, Instructor, Student",
            "Implementation Status": "Schema & Auth Design",
            "Working Features": "Basic user registration and login.",
            "Current Blockers": "None"
          },
          {
            "Timestamp": "2026-09-16T10:30:00Z",
            "Full Name": "Alex Chen",
            "Roll Number": "CS2026-088",
            "Email Address": "alex@university.edu",
            "Project Title": "Inventory System",
            "GitHub Repository URL": "https://github.com/example/inventory",
            "Hosted Live Demo URL": "https://inventory-demo.vercel.app",
            "Tech Stack": "React, Express, PostgreSQL, Tailwind",
            "Implemented Roles": "SuperAdmin, Manager, Staff",
            "Implementation Status": "Integrated & Testing Complete",
            "Working Features": "Full RBAC with dynamic menu rendering and API protection.",
            "Current Blockers": "None"
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
      const matchesSearch = 
        student["Full Name"]?.toLowerCase().includes(query) ||
        student["Roll Number"]?.toLowerCase().includes(query) ||
        student["Tech Stack"]?.toLowerCase().includes(query) ||
        student["Project Title"]?.toLowerCase().includes(query);

      let matchesFilter = true;
      if (filterStatus !== 'All') {
        const status = student["Implementation Status"]?.toLowerCase() || '';
        if (filterStatus === 'Schema' && !status.includes('schema') && !status.includes('auth')) {
          matchesFilter = false;
        } else if (filterStatus === 'Middleware' && !status.includes('middleware') && !status.includes('routing')) {
          matchesFilter = false;
        } else if (filterStatus === 'Complete' && !status.includes('complete') && !status.includes('integrated')) {
          matchesFilter = false;
        }
      }

      return matchesSearch && matchesFilter;
    });
  }, [students, searchQuery, filterStatus]);

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
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, idx) => (
                  <StudentCard key={idx} student={student} />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-[#71717A]">
                  No projects found matching your search or filter criteria.
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
