import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import FilterBar from './components/FilterBar';
import StudentCard from './components/StudentCard';

/* ── Skeletons ── */
const Skeleton = ({ className }) => (
  <div
    className={`animate-pulse rounded-xl ${className}`}
    style={{ backgroundColor: '#F4F4F5', border: '1px solid #E4E4E7' }}
  />
);

const GridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {Array.from({ length: 6 }).map((_, i) => (
      <Skeleton key={i} className="h-72" />
    ))}
  </div>
);

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((r) => setTimeout(r, 800));

        setStudents([
          {
            name: 'John Doe',
            rollno: 'CS2026-042',
            'project-title': 'Hospital Management RBAC',
            'project-description':
              'A comprehensive web application to manage hospital resources, patient records, and staff schedules with multi-level role access control.',
            'github-url': 'https://github.com/example/rbac-app',
            'total-number-of-users': 4,
            'tech-stack': ['React', 'Express', 'MySQL', 'JWT'],
            'additional-technologies': ['Tailwind CSS', 'Docker'],
          },
          {
            name: 'Sarah Connor',
            rollno: 'CS2026-015',
            'project-title': 'E-Learning Platform',
            'project-description':
              'An interactive online learning portal that allows students to enroll in courses and instructors to upload materials and evaluate assignments.',
            'github-url': 'https://github.com/example/elearning-rbac',
            'total-number-of-users': 3,
            'tech-stack': ['React', 'Node.js', 'MongoDB', 'JWT'],
            'additional-technologies': ['Material UI', 'Redis'],
          },
          {
            name: 'Alex Chen',
            rollno: 'CS2026-088',
            'project-title': 'Inventory Management System',
            'project-description':
              'A robust retail stock system to track product inventory, supplier orders, and store staff permissions across departments.',
            'github-url': 'https://github.com/example/inventory',
            'total-number-of-users': 3,
            'tech-stack': ['React', 'Express', 'PostgreSQL'],
            'additional-technologies': ['Tailwind CSS', 'TypeScript'],
          },
        ]);
        setLoading(false);
      } catch (e) {
        setError('Failed to load project data. Please verify your connection.');
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredStudents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return students;

    return students.filter((s) => {
      const allTags = [
        ...(s['tech-stack'] || []),
        ...(s['additional-technologies'] || []),
      ]
        .join(' ')
        .toLowerCase();

      return (
        s.name?.toLowerCase().includes(q) ||
        s.rollno?.toLowerCase().includes(q) ||
        s['project-title']?.toLowerCase().includes(q) ||
        allTags.includes(q)
      );
    });
  }, [students, searchQuery]);

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#FAFAFA' }}>
      <Header />

      <main className="max-w-6xl mx-auto px-6 md:px-8">
        {loading ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-28" />
              ))}
            </div>
            <Skeleton className="h-11 max-w-xl" />
            <GridSkeleton />
          </div>
        ) : error ? (
          <div
            className="rounded-xl p-6 text-center"
            style={{ backgroundColor: '#FFF5F5', border: '1px solid #FED7D7' }}
          >
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        ) : (
          <>
            <StatsOverview students={students} />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex-1">
                <FilterBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              </div>
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-md self-start sm:self-center shrink-0"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E4E4E7',
                  color: '#71717A',
                }}
              >
                {filteredStudents.length} {filteredStudents.length === 1 ? 'project' : 'projects'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, i) => (
                  <StudentCard key={student.rollno || i} student={student} />
                ))
              ) : (
                <div
                  className="col-span-full py-16 rounded-xl text-center"
                  style={{ backgroundColor: '#FFFFFF', border: '1px dashed #E4E4E7' }}
                >
                  <p className="text-sm font-medium" style={{ color: '#71717A' }}>
                    No projects found matching &ldquo;{searchQuery}&rdquo;.
                  </p>
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
