import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { EmployeeProvider } from './context/EmployeeContext';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmployeeListPage } from './pages/EmployeeListPage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { EmployeeModal } from './components/EmployeeModal';
import { EmployeeDetailModal } from './components/EmployeeDetailModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { useEmployees } from './context/EmployeeContext';

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const { addEmployee, updateEmployee, deleteEmployee } = useEmployees();

  const [activeTab, setActiveTab] = useState('dashboard');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [viewingEmployee, setViewingEmployee] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingEmployee, setDeletingEmployee] = useState(null);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (employee) => {
    setEditingEmployee(employee);
    setIsFormModalOpen(true);
  };

  const handleOpenViewModal = (employee) => {
    setViewingEmployee(employee);
    setIsDetailModalOpen(true);
  };

  const handleOpenDeleteModal = (employee) => {
    setDeletingEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, formData);
    } else {
      addEmployee(formData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={handleOpenAddModal}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAddModal={handleOpenAddModal}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' ? (
            <DashboardPage
              setActiveTab={setActiveTab}
              onOpenAddModal={handleOpenAddModal}
              onViewEmployee={handleOpenViewModal}
            />
          ) : (
            <EmployeeListPage
              onOpenAddModal={handleOpenAddModal}
              onViewEmployee={handleOpenViewModal}
              onEditEmployee={handleOpenEditModal}
              onDeleteEmployee={handleOpenDeleteModal}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <EmployeeModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingEmployee}
      />

      <EmployeeDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        employee={viewingEmployee}
        onEdit={handleOpenEditModal}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteEmployee}
        employee={deletingEmployee}
      />

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <MainLayout />
      </EmployeeProvider>
    </AuthProvider>
  );
}
