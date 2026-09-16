import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import FilterBar from './components/FilterBar';
import StudentCard from './components/StudentCard';
import { normalizeStudent } from './utils/normalizeStudent';

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
      setLoading(true);
      setError(null);

      try {
        const API_URL = import.meta.env.VITE_GOOGLE_SHEETS_API_URL;

        if (API_URL) {
          const res = await fetch(API_URL);
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}: Failed to fetch from Google Sheets endpoint`);
          }
          const data = await res.json();
          console.log('Fetched Student Data:', data);

          if (Array.isArray(data)) {
            const normalized = data.map(normalizeStudent).filter(Boolean);
            setStudents(normalized);
          } else {
            setStudents([]);
          }
        } else {
          // Fallback sample data if no environment variable is provided
          const sampleData = [
            {
              "Timestamp": "2026-09-16T16:57:13.000Z",
              "Name :": "Shamil T P",
              "Roll No:": 23,
              "Project Title": "Fedora Work Station",
              "Project Description": "Unix based operating Work Station software",
              "github url": "github.com/shamil-tp/student-list-php",
              "Total Number of users:": 5,
              "Additional Technologies and Tech Stack Used:": "JWT, bcrypt / bcryptjs / argon, Prisma ORM, Tailwind CSS, Redux, Node mailer, Axios, Nodemon, TypeScript, CORS"
            }
          ];
          setStudents(sampleData.map(normalizeStudent));
        }
      } catch (err) {
        console.error('Error loading student data:', err);
        setError(err.message || 'Failed to load project data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredStudents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return students;

    return students.filter((s) => {
      const name = String(s.name || s['Name :'] || '').toLowerCase();
      const rollno = String(s.rollno ?? s['Roll No:'] ?? '').toLowerCase();
      const title = String(s.projectTitle || s['Project Title'] || '').toLowerCase();

      let allTags = '';
      if (Array.isArray(s.tags)) {
        allTags = s.tags.join(' ').toLowerCase();
      } else {
        allTags = String(s['Additional Technologies and Tech Stack Used:'] || '').toLowerCase();
      }

      return (
        name.includes(q) ||
        rollno.includes(q) ||
        title.includes(q) ||
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
            <p className="text-xs text-red-500 mt-1">Please check your network and Google Apps Script permissions.</p>
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
                  <StudentCard key={student.id || student.rollno || i} student={student} />
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
