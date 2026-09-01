import React from 'react';
import { X, Mail, Phone, Calendar, DollarSign, Building, Award, ShieldCheck, Briefcase } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

export const EmployeeDetailModal = ({ isOpen, onClose, employee, onEdit }) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-xl backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Info */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex justify-between items-end -mt-12 mb-4">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-900 shadow-xl"
            />
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              employee.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
              employee.status === 'On Leave' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
              'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}>
              ● {employee.status}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">{employee.name}</h2>
              <span className="text-xs font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                {employee.id}
              </span>
            </div>
            <p className="text-sm font-semibold text-blue-400 mt-0.5">{employee.role}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-800 text-sm">
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Building className="w-3.5 h-3.5 text-blue-400" />
                <span>Department</span>
              </div>
              <p className="font-semibold text-slate-200">{employee.department}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Annual Salary</span>
              </div>
              <p className="font-semibold text-emerald-400">{formatCurrency(employee.salary)}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Joined Date</span>
              </div>
              <p className="font-medium text-slate-200 font-mono">{formatDate(employee.joiningDate)}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>Contact Phone</span>
              </div>
              <p className="font-medium text-slate-200 font-mono">{employee.phone || 'N/A'}</p>
            </div>
          </div>

          {/* Email row */}
          <div className="mt-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Email Address</span>
            </div>
            <a href={`mailto:${employee.email}`} className="font-mono text-blue-400 hover:underline">
              {employee.email}
            </a>
          </div>

          {/* Action button */}
          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              onClick={() => {
                onClose();
                onEdit(employee);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors border border-slate-700"
            >
              Edit Employee Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
