import React from 'react';
import { Layers } from 'lucide-react';

const Header = () => (
  <header
    className="sticky top-0 z-50 mb-12"
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #E4E4E7',
    }}
  >
    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
      {/* Brand / Logo */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-lg"
          style={{ backgroundColor: '#4F46E5' }}
        >
          <Layers className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
        <div>
          <span
            className="text-base font-semibold tracking-tight block leading-tight"
            style={{ color: '#18181B' }}
          >
            RBAC Tracker
          </span>
          <span
            className="text-xs font-medium tracking-wide block"
            style={{ color: '#71717A' }}
          >
            Evaluation & Progress Dashboard
          </span>
        </div>
      </div>

      {/* Live Status Pill */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{
          backgroundColor: '#FAFAFA',
          border: '1px solid #E4E4E7',
        }}
      >
        <span className="relative flex w-2 h-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: '#10B981' }}
          />
          <span
            className="relative inline-flex rounded-full w-2 h-2"
            style={{ backgroundColor: '#10B981' }}
          />
        </span>
        <span
          className="text-xs font-medium tracking-wider uppercase"
          style={{ color: '#71717A' }}
        >
          Active
        </span>
      </div>
    </div>
  </header>
);

export default Header;
