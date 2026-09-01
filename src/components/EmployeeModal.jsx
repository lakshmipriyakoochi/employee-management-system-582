import React, { useState, useEffect } from 'react';
import { X, Upload, Sparkles } from 'lucide-react';
import { DEPARTMENTS, AVATAR_PRESETS } from '../utils/initialData';

export const EmployeeModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    department: 'Engineering',
    role: '',
    salary: '',
    status: 'Active',
    joiningDate: new Date().toISOString().split('T')[0],
    phone: '',
    avatar: AVATAR_PRESETS[0]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        name: initialData.name || '',
        email: initialData.email || '',
        department: initialData.department || 'Engineering',
        role: initialData.role || '',
        salary: initialData.salary !== undefined ? initialData.salary : '',
        status: initialData.status || 'Active',
        joiningDate: initialData.joiningDate || new Date().toISOString().split('T')[0],
        phone: initialData.phone || '',
        avatar: initialData.avatar || AVATAR_PRESETS[0]
      });
    } else {
      setFormData({
        id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
        name: '',
        email: '',
        department: 'Engineering',
        role: '',
        salary: '',
        status: 'Active',
        joiningDate: new Date().toISOString().split('T')[0],
        phone: '',
        avatar: AVATAR_PRESETS[Math.floor(Math.random() * AVATAR_PRESETS.length)]
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.role.trim()) newErrors.role = 'Role / Position is required';
    if (formData.salary === '' || isNaN(formData.salary) || Number(formData.salary) < 0) {
      newErrors.salary = 'Valid positive salary amount is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              {isEditing ? '✏️ Edit Employee Details' : '👤 Add New Employee'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEditing ? 'Update profile info and compensation' : 'Create a new staff record in the system'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {/* Avatar Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
              Select Avatar
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {AVATAR_PRESETS.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, avatar: url })}
                  className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-all flex-shrink-0 ${
                    formData.avatar === url ? 'border-blue-500 scale-110 ring-4 ring-blue-500/20' : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Employee ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Employee ID</label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                disabled={isEditing}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 font-mono text-sm focus:outline-none disabled:opacity-60"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Employment Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Terminated">Terminated</option>
              </select>
            </div>

            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Sarah Connor"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none ${
                  errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address *</label>
              <input
                type="email"
                placeholder="sarah@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none ${
                  errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Department *</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:border-blue-500 focus:outline-none"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Role / Position *</label>
              <input
                type="text"
                placeholder="e.g. Senior Developer"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none ${
                  errors.role ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {errors.role && <p className="text-xs text-rose-400 mt-1">{errors.role}</p>}
            </div>

            {/* Salary */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Annual Salary ($) *</label>
              <input
                type="number"
                placeholder="100000"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl bg-slate-950 border text-slate-100 text-sm focus:outline-none ${
                  errors.salary ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {errors.salary && <p className="text-xs text-rose-400 mt-1">{errors.salary}</p>}
            </div>

            {/* Joining Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Joining Date</label>
              <input
                type="date"
                value={formData.joiningDate}
                onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isEditing ? 'Save Changes' : 'Create Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
