import React from 'react';
import { LayoutDashboard } from 'lucide-react';

const Header = () => {
  return (
    <header
      style={{ backgroundColor: '#1040C0', borderBottom: '4px solid #121212', boxShadow: '0px 8px 0px 0px #121212' }}
      className="mb-12"
    >
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <div
            style={{
              backgroundColor: '#F0C020',
              border: '4px solid #121212',
              boxShadow: '4px 4px 0px 0px #121212',
              padding: '12px',
              borderRadius: '9999px',
            }}
          >
            <LayoutDashboard className="w-8 h-8 md:w-10 md:h-10" strokeWidth={3} style={{ color: '#121212' }} />
          </div>
          <div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl"
              style={{ color: 'white', textShadow: '4px 4px 0 #121212' }}
            >
              RBAC
            </h1>
            <p
              className="text-xl md:text-3xl font-bold uppercase tracking-widest"
              style={{ color: 'white', textShadow: '2px 2px 0 #121212', lineHeight: 1.2 }}
            >
              Project Dashboard
            </p>
          </div>
        </div>

        {/* Live badge */}
        <div
          style={{
            backgroundColor: 'white',
            border: '4px solid #121212',
            boxShadow: '4px 4px 0px 0px #121212',
            padding: '10px 20px',
          }}
          className="flex items-center gap-3"
        >
          <div
            className="w-4 h-4 rounded-full animate-pulse"
            style={{ backgroundColor: '#D02020', border: '2px solid #121212' }}
          ></div>
          <span
            className="font-bold uppercase tracking-widest text-sm"
            style={{ color: '#121212' }}
          >
            System Active
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
