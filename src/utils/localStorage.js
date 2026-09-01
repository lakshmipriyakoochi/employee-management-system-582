import { INITIAL_EMPLOYEES } from './initialData';

const EMPLOYEES_STORAGE_KEY = 'emp_system_employees_v1';
const AUTH_STORAGE_KEY = 'emp_system_auth_v1';

export const getStoredEmployees = () => {
  try {
    const data = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(INITIAL_EMPLOYEES));
      return INITIAL_EMPLOYEES;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading employees from localStorage:", error);
    return INITIAL_EMPLOYEES;
  }
};

export const saveStoredEmployees = (employees) => {
  try {
    localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
  } catch (error) {
    console.error("Error saving employees to localStorage:", error);
  }
};

export const getStoredAuth = () => {
  try {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading auth from localStorage:", error);
    return null;
  }
};

export const saveStoredAuth = (user) => {
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (error) {
    console.error("Error saving auth to localStorage:", error);
  }
};
