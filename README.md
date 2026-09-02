# NEXUS EMS — Employee Management System

**Nexus EMS** is a modern, single-page Employee Management System built with React. It provides an organized platform for managing employee profiles, departments, salaries, employment status, and workforce analytics through an intuitive dashboard.

### Project Links

**Live Application:** https://employee-management-system-582.vercel.app

**GitHub Repository:** https://github.com/lakshmipriyakoochi/employee-management-system-582

---

# 1. Project Overview

Nexus EMS provides a centralized employee directory that helps organizations efficiently manage and monitor employee information.

### Key Capabilities

* Employee profile management
* Employee directory
* Dashboard analytics
* Department-wise workforce distribution
* Salary and payroll tracking
* Employee status management
* Search and filtering
* Sorting and multiple viewing modes
* Employee profile details
* Add, edit, and delete operations
* Persistent user sessions
* Data persistence
* Form validation
* Toast notifications

---

# 2. User Guide

## 2.1 Signing In

When the application starts, users are presented with the:

**NEXUS EMS — Employee Management System Portal**

The application provides role-based login options.

| Email                    | Role                 |
| ------------------------ | -------------------- |
| `admin@company.com`      | System Administrator |
| `hr.manager@company.com` | HR Manager           |

### Login Process

The application automatically determines the user's role based on the entered email.

* Emails containing `admin` are assigned the **System Administrator** role.
* Other emails are assigned the **HR Manager** role.
* The display name is generated from the portion of the email before `@`.

For example:

```text
admin@company.com
        ↓
Display Name: admin
Role: System Administrator
```

### Session Persistence

The user session is persisted using browser storage, allowing the user to remain logged in after refreshing the application.

The session can be ended using the **Logout** option.

---

# 3. Dashboard

After signing in, users are taken to the **Dashboard**.

The dashboard provides a high-level overview of the workforce.

## KPI Cards

The dashboard displays:

| KPI                  | Description                     |
| -------------------- | ------------------------------- |
| **Total Workforce**  | Total number of employees       |
| **Active Personnel** | Number of active employees      |
| **Active Rate**      | Percentage of active employees  |
| **Annual Payroll**   | Total annual salary expenditure |
| **Average Salary**   | Average salary per employee     |
| **Departments**      | Number of departments           |

## Department Distribution

The Department Distribution section provides a visual breakdown of employees across departments.

It displays:

* Number of employees
* Department-wise distribution
* Percentage of total workforce

## Recent Employees

The dashboard displays the **five most recently added employees**.

Users can quickly open an employee's profile using the available view shortcut.

## Quick Actions

Users can quickly access:

* **Add New Staff**
* **Employee Directory**

---

# 4. Employee Directory

The Employee Directory provides a complete list of employee records.

## Search

The real-time search feature can search employees using:

* Name
* Email
* Department
* Role
* Employee ID

## Filtering

Employees can be filtered based on:

### Department

* All Departments
* Engineering
* Design
* Marketing
* Human Resources
* Finance
* Sales
* Operations

### Employment Status

* All
* Active
* On Leave
* Terminated

## Sorting

Employees can be sorted using:

* Name — A to Z
* Name — Z to A
* Salary — High to Low
* Salary — Low to High
* Recently Joined

## View Options

The Employee Directory provides two viewing modes:

### Table View

Displays employee information in a structured table format.

### Card Grid View

Displays employees using individual profile cards.

Users can switch between these layouts using the view toggle.

---

# 5. Employee Operations

Users can perform the following operations from the Employee Directory:

### View Employee

Displays the employee's complete profile information.

### Edit Employee

Allows employee information to be updated.

### Delete Employee

Removes an employee record after a confirmation step.

### Add Employee

Allows users to create a new employee record.

---

# 6. Adding or Editing an Employee

The Add/Edit Employee form contains the following fields:

| Field                 | Description                        |
| --------------------- | ---------------------------------- |
| **Avatar**            | Select from 8 preset avatar images |
| **Employee ID**       | Automatically generated            |
| **Employment Status** | Active / On Leave / Terminated     |
| **Full Name**         | Required                           |
| **Email Address**     | Required and validated             |
| **Phone Number**      | Optional                           |
| **Department**        | Required                           |
| **Role / Position**   | Required                           |
| **Annual Salary**     | Required and must be positive      |
| **Joining Date**      | Defaults to the current date       |

### Employee ID

A new employee receives an automatically generated ID such as:

```text
EMP-4821
```

The Employee ID is locked while editing an existing employee.

### Form Validation

Required fields are validated before saving.

The application provides inline validation for:

* Missing required fields
* Invalid email addresses
* Invalid salary values
* Missing department
* Missing role

### Notifications

After completing an operation, the application displays a confirmation notification such as:

```text
Employee added
Employee updated
Employee deleted
```

---

# 7. Data Persistence

Nexus EMS uses browser storage to persist application information.

Employee records and user session information remain available after refreshing the application.

### Storage Keys

| Storage Key               | Purpose                         |
| ------------------------- | ------------------------------- |
| `emp_system_employees_v1` | Stores employee records         |
| `emp_system_auth_v1`      | Stores the current user session |

### Initial Data

When the application is opened for the first time, it automatically initializes with **8 sample employees** distributed across multiple departments.

A reset functionality is also available to restore the original employee dataset.

---

# 8. Technical Documentation

## 8.1 Technology Stack

| Layer              | Technology                 |
| ------------------ | -------------------------- |
| Frontend Framework | React 18                   |
| Build Tool         | Vite 5                     |
| Styling            | Tailwind CSS 3             |
| Icons              | lucide-react               |
| State Management   | React Context API          |
| Data Persistence   | Browser Storage            |
| UI Design          | Dark Theme & Glassmorphism |
| Deployment         | Vercel                     |

---

# 9. Project Structure

```text
employee-management-system-582/
│
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
│
└── src/
    │
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    │
    ├── context/
    │   ├── AuthContext.jsx
    │   └── EmployeeContext.jsx
    │
    ├── pages/
    │   ├── LoginPage.jsx
    │   ├── DashboardPage.jsx
    │   └── EmployeeListPage.jsx
    │
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Sidebar.jsx
    │   ├── StatCard.jsx
    │   ├── EmployeeTable.jsx
    │   ├── EmployeeGrid.jsx
    │   ├── EmployeeModal.jsx
    │   ├── EmployeeDetailModal.jsx
    │   ├── DeleteConfirmModal.jsx
    │   └── Toast.jsx
    │
    └── utils/
        ├── initialData.js
        ├── localStorage.js
        └── formatters.js
```

---

# 10. Application Architecture

Nexus EMS follows a component-based React architecture.

```text
                    NEXUS EMS
                        │
                        ▼
                   React App
                        │
          ┌─────────────┴─────────────┐
          │                           │
          ▼                           ▼
     AuthContext               EmployeeContext
          │                           │
          ▼                           ▼
   User Authentication          Employee Management
                                      │
                         ┌────────────┼────────────┐
                         ▼            ▼            ▼
                       Add          Edit         Delete
                         │            │            │
                         └────────────┴────────────┘
                                      │
                                      ▼
                              Employee Directory
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
                Dashboard          Search           Filters
```

---

# 11. Authentication Architecture

`AuthContext.jsx` is responsible for managing:

* User login
* User logout
* Current user information
* User role
* Session persistence

### Login Flow

```text
User enters email
       ↓
Email is processed
       ↓
Display name generated
       ↓
User role determined
       ↓
Session information stored
       ↓
Dashboard displayed
```

---

# 12. Employee Context

`EmployeeContext.jsx` manages employee-related operations.

### CRUD Operations

```text
Create → addEmployee()
Read   → Employee State
Update → updateEmployee()
Delete → deleteEmployee()
```

The context also manages toast notifications for employee operations.

### Reset Functionality

The application includes:

```text
resetToDefaultData()
```

which restores the original sample employee records.

---

# 13. Data Model

Each employee record follows the following structure:

```json
{
  "id": "EMP-1001",
  "name": "Eleanor Vance",
  "email": "eleanor.vance@company.com",
  "department": "Engineering",
  "role": "Lead Frontend Architect",
  "salary": 135000,
  "status": "Active",
  "joiningDate": "2022-03-15",
  "phone": "+1 (555) 234-5678",
  "avatar": "https://images.unsplash.com/..."
}
```

## Departments

The application supports the following departments:

```text
Engineering
Design
Marketing
Human Resources
Finance
Sales
Operations
```

## Employment Status

```text
Active
On Leave
Terminated
```

---

# 14. Local Development

## Requirements

* Node.js
* npm
* Git

## Clone the Repository

```bash
git clone https://github.com/lakshmipriyakoochi/employee-management-system-582.git
```

## Navigate to the Project

```bash
cd employee-management-system-582
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

The development application runs on:

```text
http://localhost:3000
```

---

# 15. Available Scripts

| Command           | Purpose                            |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Starts the Vite development server |
| `npm run build`   | Creates the production build       |
| `npm run preview` | Previews the production build      |

---

# 16. Deployment

Nexus EMS is deployed using **Vercel**.

### Deployment Process

```text
Source Code
     ↓
   Vite
     ↓
Production Build
     ↓
   Vercel
     ↓
Live Application
```

The project is configured as a Vite application and can be deployed through modern static hosting platforms.

---

# 17. Key Features

## Employee Management

* Add employees
* Edit employee information
* Delete employees
* View detailed employee profiles

## Workforce Analytics

* Total workforce
* Active personnel
* Active percentage
* Annual payroll
* Average salary
* Department distribution

## Search & Organization

* Real-time search
* Department filtering
* Status filtering
* Salary sorting
* Name sorting
* Recently joined sorting

## User Experience

* Modern dark interface
* Glassmorphism design
* Responsive layouts
* Table view
* Card grid view
* Interactive modals
* Confirmation dialogs
* Toast notifications
* Form validation

---

# 18. Skills Demonstrated

This project demonstrates practical knowledge of:

* React.js
* JavaScript
* JSX
* React Context API
* Component-based architecture
* CRUD operations
* State management
* Form validation
* Browser storage
* Tailwind CSS
* Responsive web design
* Vite
* Git & GitHub
* Vercel deployment

---

# 19. Future Enhancements

The system can be further enhanced with features such as:

* Advanced employee analytics
* Attendance management
* Leave management
* Payroll management
* Employee performance tracking
* Report generation
* Excel/PDF export
* Email notifications
* Advanced role-based permissions
* Cloud data synchronization
* Enhanced authentication
* REST API integration

---

# 20. Conclusion

Nexus EMS is a modern Employee Management System designed to provide an efficient and intuitive way to organize employee information and monitor workforce statistics.

By combining **React 18, Context API, Tailwind CSS, Vite, browser storage, and Vercel deployment**, the project demonstrates practical frontend development and application design skills.

The system provides a complete employee-management experience with **dashboard analytics, employee CRUD operations, search and filtering, form validation, responsive layouts, and persistent application data**.

Nexus EMS demonstrates the practical application of modern web development concepts in building a structured and user-friendly business application.



