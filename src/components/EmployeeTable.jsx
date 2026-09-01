import React from 'react';
import { Eye, Edit3, Trash2, Mail, Phone, Calendar, DollarSign, Building } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

export const EmployeeTable = ({ employees, onView, onEdit, onDelete }) => {
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>Active</span>;
      case 'On Leave':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>On Leave</span>;
      case 'Terminated':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20"><span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>Terminated</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300">{status}</span>;
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md shadow-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <th className="py-4 px-5">Employee Info</th>
            <th className="py-4 px-5">Department & Role</th>
            <th className="py-4 px-5">Salary</th>
            <th className="py-4 px-5">Joined Date</th>
            <th className="py-4 px-5">Status</th>
            <th className="py-4 px-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-sm">
          {employees.map((emp) => (
            <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors group">
              {/* Info Column */}
              <td className="py-3.5 px-5">
                <div className="flex items-center gap-3">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-blue-500/50 transition-all"
                  />
                  <div>
                    <div className="font-semibold text-slate-100 flex items-center gap-2">
                      <span>{emp.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                        {emp.id}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-slate-500" />
                      <span>{emp.email}</span>
                    </div>
                  </div>
                </div>
              </td>

              {/* Department & Role */}
              <td className="py-3.5 px-5">
                <div className="font-medium text-slate-200">{emp.department}</div>
                <div className="text-xs text-slate-400">{emp.role}</div>
              </td>

              {/* Salary */}
              <td className="py-3.5 px-5 font-semibold text-slate-100">
                {formatCurrency(emp.salary)}
              </td>

              {/* Joined Date */}
              <td className="py-3.5 px-5 text-slate-300 text-xs font-mono">
                {formatDate(emp.joiningDate)}
              </td>

              {/* Status */}
              <td className="py-3.5 px-5">
                {getStatusBadge(emp.status)}
              </td>

              {/* Action Buttons */}
              <td className="py-3.5 px-5 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => onView(emp)}
                    title="View Details"
                    className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onEdit(emp)}
                    title="Edit Employee"
                    className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDelete(emp)}
                    title="Delete Employee"
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
