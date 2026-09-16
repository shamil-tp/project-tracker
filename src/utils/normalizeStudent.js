/**
 * Normalizes student project data from various schema sources (e.g. Google Apps Script / Forms, custom APIs, or local mocks).
 */
export function normalizeStudent(raw, index = 0) {
  if (!raw || typeof raw !== 'object') return null;

  // Name: handles "Name :", "Name:", "Full Name", "name", etc.
  const rawName =
    raw['Name :'] ??
    raw['Name:'] ??
    raw['Name'] ??
    raw['Full Name'] ??
    raw['name'] ??
    '';
  const name = String(rawName).trim() || `Student #${index + 1}`;

  // Roll Number: handles "Roll No:", "Roll No", "Roll Number", "rollno", numbers like 23
  const rawRoll =
    raw['Roll No:'] ??
    raw['Roll No'] ??
    raw['Roll Number'] ??
    raw['rollno'] ??
    '';
  const rollno = String(rawRoll).trim() || 'N/A';

  // Project Title: handles "Project Title", "Project Title :", "project-title"
  const rawTitle =
    raw['Project Title'] ??
    raw['Project Title :'] ??
    raw['project-title'] ??
    raw['Title'] ??
    '';
  const projectTitle = String(rawTitle).trim() || 'Untitled Project';

  // Project Description: handles "Project Description", "project-description"
  const rawDesc =
    raw['Project Description'] ??
    raw['Project Description :'] ??
    raw['project-description'] ??
    '';
  const projectDescription = String(rawDesc).trim();

  // Total Number of Users: handles "Total Number of users:", "Total Number of users", "total-number-of-users"
  const rawUsers =
    raw['Total Number of users:'] ??
    raw['Total Number of users'] ??
    raw['total-number-of-users'] ??
    raw['users'] ??
    0;
  const totalUsers = Number(rawUsers) || 0;

  // GitHub URL: handles "github url", "GitHub Repository URL", "github-url"
  let rawGithub =
    raw['github url'] ??
    raw['GitHub Repository URL'] ??
    raw['github-url'] ??
    raw['github'] ??
    '';
  rawGithub = String(rawGithub).trim();
  let githubUrl = '';
  if (rawGithub) {
    if (rawGithub.startsWith('http://') || rawGithub.startsWith('https://')) {
      githubUrl = rawGithub;
    } else {
      githubUrl = `https://${rawGithub}`;
    }
  }

  // Technologies & Tech Stack:
  // Handles comma-separated string like "JWT, bcrypt / bcryptjs / argon, Prisma ORM..."
  // as well as arrays
  let tags = [];
  const rawCombinedTech =
    raw['Additional Technologies and Tech Stack Used:'] ??
    raw['Additional Technologies and Tech Stack Used'] ??
    raw['Tech Stack'] ??
    '';

  if (typeof rawCombinedTech === 'string' && rawCombinedTech.trim()) {
    tags.push(...rawCombinedTech.split(',').map((t) => t.trim()).filter(Boolean));
  } else if (Array.isArray(rawCombinedTech)) {
    tags.push(...rawCombinedTech);
  }

  if (Array.isArray(raw['tech-stack'])) {
    tags.push(...raw['tech-stack']);
  }
  if (Array.isArray(raw['additional-technologies'])) {
    tags.push(...raw['additional-technologies']);
  }

  // Clean and deduplicate tags
  const uniqueTags = Array.from(
    new Set(tags.map((t) => String(t).trim()).filter(Boolean))
  );

  return {
    id: `${rollno}-${name}-${index}`,
    name,
    rollno,
    projectTitle,
    projectDescription,
    totalUsers,
    githubUrl,
    tags: uniqueTags,
    raw,
  };
}
