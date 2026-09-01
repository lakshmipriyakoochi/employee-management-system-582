import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredEmployees, saveStoredEmployees } from '../utils/localStorage';
import { INITIAL_EMPLOYEES } from '../utils/initialData';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => getStoredEmployees());
  const [toast, setToast] = useState(null);

  useEffect(() => {
    saveStoredEmployees(employees);
  }, [employees]);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const clearToast = () => setToast(null);

  const addEmployee = (newEmpData) => {
    const newEmp = {
      ...newEmpData,
      id: newEmpData.id || `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      salary: Number(newEmpData.salary) || 0,
      avatar: newEmpData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      status: newEmpData.status || 'Active',
      joiningDate: newEmpData.joiningDate || new Date().toISOString().split('T')[0]
    };

    setEmployees(prev => [newEmp, ...prev]);
    showToast(`Employee ${newEmp.name} added successfully!`, 'success');
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees(prev =>
      prev.map(emp => 
        emp.id === id 
          ? { 
              ...emp, 
              ...updatedData, 
              salary: Number(updatedData.salary) || emp.salary 
            } 
          : emp
      )
    );
    showToast(`Employee updated successfully!`, 'info');
  };

  const deleteEmployee = (id) => {
    const empToDelete = employees.find(e => e.id === id);
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    showToast(`Employee ${empToDelete ? empToDelete.name : id} deleted.`, 'warning');
  };

  const resetToDefaultData = () => {
    setEmployees(INITIAL_EMPLOYEES);
    showToast('Reset data to default sample employees.', 'info');
  };

  return (
    <EmployeeContext.Provider value={{
      employees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      resetToDefaultData,
      toast,
      showToast,
      clearToast
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
