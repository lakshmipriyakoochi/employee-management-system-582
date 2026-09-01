import React from 'react';
import { LayoutDashboard, Users, UserPlus, RotateCcw, ShieldCheck } from 'lucide-react';
import { useEmployees } from '../context/EmployeeContext';

export const Sidebar = ({ activeTab, setActiveTab, onOpenAddModal }) => {
  const { resetToDefaultData, employees } = useEmployees();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'All Employees', icon: Users, badge: employees.length }
  ];

  return (
    <aside className="w-64 bg-slate-900/60 border-r border-slate-800/80 flex-shrink-0 flex flex-col justify-between py-6 px-4 hidden md:flex">
      <div className="space-y-6">
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Navigation</div>
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${
                      isActive ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Quick Actions</div>
          <div className="space-y-1.5">
            <button
              onClick={onOpenAddModal}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/40 transition-all hover:text-white group"
            >
              <UserPlus className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>Add New Employee</span>
            </button>

            <button
              onClick={resetToDefaultData}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-amber-300 bg-slate-800/20 hover:bg-amber-950/30 border border-slate-800 hover:border-amber-500/30 transition-all group"
            >
              <RotateCcw className="w-4 h-4 text-amber-500/70 group-hover:rotate-180 transition-transform duration-500" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Status footer */}
      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-slate-200">LocalStorage Sync</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-tight">
          All employee records persist in local browser cache.
        </p>
      </div>
    </aside>
  );
};
