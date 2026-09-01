import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Building2, Bell } from 'lucide-react';

export const Navbar = ({ activeTab, setActiveTab, onOpenAddModal }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-4 lg:px-8 flex items-center justify-between">
      {/* Brand Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
            <Building2 className="w-5 h-5 text-blue-400" />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg text-white tracking-tight leading-none">
            NEXUS<span className="text-blue-500 font-extrabold">EMS</span>
          </h1>
          <p className="text-[11px] text-slate-400 font-medium">Enterprise Staff Portal</p>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {/* Quick Add Button */}
        <button
          onClick={onOpenAddModal}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="text-base font-bold leading-none">+</span> Add Staff
        </button>

        {/* User Pill & Logout */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
          <div className="flex items-center gap-2.5">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
            />
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-slate-200">{user?.name || "Admin User"}</div>
              <div className="text-[10px] text-blue-400 font-medium">{user?.role || "Administrator"}</div>
            </div>
          </div>

          <button
            onClick={logout}
            title="Log out"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
