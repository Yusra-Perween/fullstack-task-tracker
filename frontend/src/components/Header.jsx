import React from 'react';
import { LayoutList, CheckCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass-card animate-fade-in" style={{ marginBottom: 'var(--space-xl)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          padding: '0.75rem',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(123, 44, 191, 0.4)'
        }}>
          <CheckCircle size={28} color="white" />
        </div>
        <div>
          <h1 className="heading-1" style={{ margin: 0, fontSize: '2rem' }}>TaskTracker</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>COLL-EDGE CONNECT Internship Assignment</p>
        </div>
      </div>
      
      <div className="badge badge-in-progress" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <LayoutList size={16} />
        <span>MERN Stack</span>
      </div>
    </header>
  );
};

export default Header;
