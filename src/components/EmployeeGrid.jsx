import React from 'react';
import { Eye, Edit3, Trash2, Mail, Phone, Calendar, DollarSign, Building } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

export const EmployeeGrid = ({ employees, onView, onEdit, onDelete }) => {
  if (employees.length === 0) {
    return (
      <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800">
        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-500">
          🔍
        </div>
        <h3 className="text-base font-semibold text-slate-300">No Employees Found</h3>
        <p className="text-sm text-slate-500 mt-1">Try adjusting your search filters or add a new employee.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {employees.map((emp) => (
        <div
          key={emp.id}
          className="group relative p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 flex flex-col justify-between"
        >
          <div>
            {/* Header: ID & Status */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                {emp.id}
              </span>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                emp.status === 'On Leave' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {emp.status}
              </span>
            </div>

            {/* Profile Avatar & Info */}
            <div className="text-center mb-4">
              <img
                src={emp.avatar}
                alt={emp.name}
                className="w-16 h-16 rounded-full object-cover mx-auto ring-4 ring-slate-800 group-hover:ring-blue-500/40 transition-all shadow-md mb-2"
              />
              <h4 className="font-bold text-slate-100 text-base group-hover:text-blue-300 transition-colors">
                {emp.name}
              </h4>
              <p className="text-xs text-blue-400 font-medium">{emp.role}</p>
              <p className="text-xs text-slate-400 mt-0.5">{emp.department}</p>
            </div>

            {/* Meta details */}
            <div className="space-y-2 py-3 border-t border-b border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="truncate max-w-[140px] text-slate-300 font-mono" title={emp.email}>{emp.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Salary:</span>
                <span className="font-semibold text-slate-200">{formatCurrency(emp.salary)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Joined:</span>
                <span className="text-slate-300 font-mono">{formatDate(emp.joiningDate)}</span>
              </div>
            </div>
          </div>

          {/* Card Actions */}
          <div className="flex items-center justify-between pt-3 mt-1">
            <button
              onClick={() => onView(emp)}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-slate-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors border border-slate-800 hover:border-blue-500/30 mr-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> Details
            </button>
            
            <button
              onClick={() => onEdit(emp)}
              className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete(emp)}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
