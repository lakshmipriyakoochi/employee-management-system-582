import React, { useState, useMemo } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import { EmployeeTable } from '../components/EmployeeTable';
import { EmployeeGrid } from '../components/EmployeeGrid';
import { Search, Filter, LayoutGrid, List, UserPlus, ArrowUpDown, RefreshCw } from 'lucide-react';
import { DEPARTMENTS } from '../utils/initialData';

export const EmployeeListPage = ({ onOpenAddModal, onViewEmployee, onEditEmployee, onDeleteEmployee }) => {
  const { employees } = useEmployees();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  // Filtered & Sorted Employees
  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => {
        // Search term matching
        const matchesSearch =
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.id.toLowerCase().includes(searchTerm.toLowerCase());

        // Department matching
        const matchesDept = selectedDepartment === 'All' || emp.department === selectedDepartment;

        // Status matching
        const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;

        return matchesSearch && matchesDept && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'salary-desc':
            return (b.salary || 0) - (a.salary || 0);
          case 'salary-asc':
            return (a.salary || 0) - (b.salary || 0);
          case 'date-desc':
            return new Date(b.joiningDate) - new Date(a.joiningDate);
          default:
            return 0;
        }
      });
  }, [employees, searchTerm, selectedDepartment, selectedStatus, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header & Title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Employee Directory</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage, filter, and inspect staff profiles ({filteredEmployees.length} of {employees.length} total records)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" /> Add Employee
          </button>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-lg flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Real-time Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, email, department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:border-blue-500 focus:outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Department Filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:border-blue-500 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Terminated">Terminated</option>
          </select>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option value="name-asc">Sort: Name (A-Z)</option>
              <option value="name-desc">Sort: Name (Z-A)</option>
              <option value="salary-desc">Sort: Salary (High to Low)</option>
              <option value="salary-asc">Sort: Salary (Low to High)</option>
              <option value="date-desc">Sort: Joined Recently</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main View Display */}
      {viewMode === 'table' ? (
        <EmployeeTable
          employees={filteredEmployees}
          onView={onViewEmployee}
          onEdit={onEditEmployee}
          onDelete={onDeleteEmployee}
        />
      ) : (
        <EmployeeGrid
          employees={filteredEmployees}
          onView={onViewEmployee}
          onEdit={onEditEmployee}
          onDelete={onDeleteEmployee}
        />
      )}
    </div>
  );
};
