import React from 'react';
import { AppView } from '../types';
import Header from './Header';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  onNavigate: (view: AppView, cleaner?: any) => void;
}

/**
 * Admin Layout - Includes header and navigation
 */
const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentView, onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light">
      <Header currentView={currentView} onNavigate={onNavigate} />
      <main className="flex-1 bg-[#f2f6f9]">
        {children}
      </main>
      <footer className="py-2 px-4 text-center text-[#4c669a] text-sm border-t border-[#e7ebf3] bg-white">
        <p>© 2026 Xpect Group. All worker records are encrypted and stored in compliance with GDPR regulations.</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
