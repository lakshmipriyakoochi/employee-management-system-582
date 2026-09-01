import React from 'react';
import { useEmployees } from '../context/EmployeeContext';
import { StatCard } from '../components/StatCard';
import { Users, DollarSign, Building2, UserCheck, ArrowUpRight, TrendingUp, Plus, Eye } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

export const DashboardPage = ({ setActiveTab, onOpenAddModal, onViewEmployee }) => {
  const { employees } = useEmployees();

  // Metrics calculations
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'Active').length;
  const totalSalary = employees.reduce((sum, e) => sum + (Number(e.salary) || 0), 0);
  const avgSalary = totalEmployees > 0 ? Math.round(totalSalary / totalEmployees) : 0;

  // Department distribution
  const departmentCounts = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  const topDepartments = Object.entries(departmentCounts)
    .sort((a, b) => b[1] - a[1]);

  const recentEmployees = [...employees].slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/20 to-slate-900 border border-blue-500/20 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-3">
            Dashboard Overview
          </span>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            Employee Operations & Analytics
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Monitor staff allocation, payroll expenditure, and organizational growth in real-time.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={onOpenAddModal}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add New Staff
            </button>
            <button
              onClick={() => setActiveTab('employees')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 transition-all flex items-center gap-1.5"
            >
              View All Employees <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Workforce"
          value={totalEmployees}
          subtitle="Registered staff members"
          icon={Users}
          color="blue"
          trend="+12% YoY"
        />
        <StatCard
          title="Active Personnel"
          value={activeEmployees}
          subtitle={`${Math.round((activeEmployees / (totalEmployees || 1)) * 100)}% active rate`}
          icon={UserCheck}
          color="emerald"
        />
        <StatCard
          title="Annual Payroll"
          value={formatCurrency(totalSalary)}
          subtitle={`Avg ${formatCurrency(avgSalary)} / staff`}
          icon={DollarSign}
          color="indigo"
        />
        <StatCard
          title="Departments"
          value={Object.keys(departmentCounts).length}
          subtitle="Functional divisions"
          icon={Building2}
          color="amber"
        />
      </div>

      {/* Section Grid: Department Distribution & Recent Staff */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Breakdown Bar Visual */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" /> Department Distribution
              </h3>
              <span className="text-xs text-slate-500 font-mono">{totalEmployees} Total</span>
            </div>

            <div className="space-y-4 my-4">
              {topDepartments.map(([dept, count]) => {
                const percentage = Math.round((count / totalEmployees) * 100);
                return (
                  <div key={dept}>
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span className="text-slate-300">{dept}</span>
                      <span className="text-slate-400 font-mono">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('employees')}
            className="w-full py-2.5 mt-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-xs font-semibold text-blue-400 border border-slate-700/50 transition-colors flex items-center justify-center gap-1"
          >
            Manage Department Allocations <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Recent Employees Table */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" /> Recent Employees
                </h3>
                <p className="text-xs text-slate-400">Latest additions to the company directory</p>
              </div>

              <button
                onClick={() => setActiveTab('employees')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300"
              >
                View All →
              </button>
            </div>

            <div className="divide-y divide-slate-800/60">
              {recentEmployees.map((emp) => (
                <div key={emp.id} className="py-3 flex items-center justify-between hover:bg-slate-800/30 px-2 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.avatar}
                      alt={emp.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-800"
                    />
                    <div>
                      <div className="font-semibold text-sm text-slate-100">{emp.name}</div>
                      <div className="text-xs text-slate-400">{emp.role} • <span className="text-blue-400">{emp.department}</span></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-semibold text-slate-200">{formatCurrency(emp.salary)}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{formatDate(emp.joiningDate)}</div>
                    </div>
                    <button
                      onClick={() => onViewEmployee(emp)}
                      className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
