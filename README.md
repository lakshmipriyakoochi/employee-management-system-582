Nexus EMS — Employee Management System

Live app:
https://employee-management-system-582.vercel.app 
Repository: https://github.com/lakshmipriyakoochi/employee-management-system-582

Nexus EMS is a single-page React application for managing an employee directory — tracking staff profiles, departments, salaries, and status, with a dashboard for high-level workforce analytics. All data is stored locally in the browser (no backend/database).

1. User Guide
1.1 Signing In

The app opens on a login screen ("NEXUS EMS — Employee Management System Portal"). 
Button	Email	Role assigned
System Admin	admin@company.com	System Administrator
HR Manager	hr.manager@company.com	HR Manager

The role shown after login is derived automatically: if the email contains "admin", the role becomes System Administrator; otherwise it becomes HR Manager. Your display name is generated from the part of the email before the @.

Your session persists in the browser (via local storage), so you'll stay logged in on refresh until you log out.

1.2 Dashboard

After logging in you land on the Dashboard, which shows:

KPI cards: Total Workforce, Active Personnel (with active-rate %), Annual Payroll (with average salary per staff member), and number of Departments.
Department Distribution: a bar breakdown of how many employees sit in each department, with percentages.
Recent Employees: the 5 most recently added employees, with a quick "view" shortcut into their profile.
Quick action buttons to Add New Staff or jump to the full Employee Directory.
1.3 Employee Directory

The Employees section lists every staff record and supports:

Search — matches against name, email, department, role, or employee ID in real time.
Filter — by Department (or "All Departments") and by Status (Active / On Leave / Terminated / All).
Sort — Name (A–Z / Z–A), Salary (High→Low / Low→High), or Joined Recently.
View toggle — switch between a Table layout and a Card Grid layout.

From either layout you can:

View an employee's full profile in a detail modal.
Edit an employee's details.
Delete an employee (with a confirmation step).
Add Employee via a button in the header.
1.4 Adding or Editing an Employee

The Add/Edit form captures:

Field	Notes
Avatar	Pick from 8 preset avatar images
Employee ID	Auto-generated (e.g. EMP-4821); locked when editing
Employment Status	Active / On Leave / Terminated
Full Name *	Required
Email Address *	Required, validated for a basic email format
Phone Number	Optional
Department *	Choose from: Engineering, Design, Marketing, Human Resources, Finance, Sales, Operations
Role / Position *	Required, free text
Annual Salary ($) *	Required, must be a positive number
Joining Date	Defaults to today

Fields marked * are required — the form will show inline validation errors if left blank or invalid. On successful save, a toast notification confirms the action ("Employee added", "Employee updated", or "Employee deleted").

1.5 Data Persistence
All employee records and your login session are saved in the browser's local storage .
Data persists across page refreshes and browser restarts on the same device/browser, but does not sync across devices or browsers, and clearing browser data will reset it.
On first load (or if local storage is empty), the app seeds itself with 8 sample employees across Engineering, Design, HR, Marketing, Finance, and Sales.
2. Technical Documentation
2.1 Tech Stack
Layer	Technology
Framework	React 18
Build tool	Vite 5
Styling	Tailwind CSS 3 (dark theme, glassmorphism panels)
Icons	lucide-react
State management	React Context API (no Redux)
Persistence	Browser localStorage (no backend/database)
Deployment	Vercel
2.2 Project Structure
employee-management-system-582/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx                 # React entry point
    ├── App.jsx                  # Root layout, modal state, routing between tabs
    ├── index.css                # Tailwind base styles
    ├── context/
    │   ├── AuthContext.jsx      # Login/logout, current user
    │   └── EmployeeContext.jsx  # CRUD operations, toast notifications
    ├── pages/
    │   ├── LoginPage.jsx
    │   ├── DashboardPage.jsx
    │   └── EmployeeListPage.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Sidebar.jsx
    │   ├── StatCard.jsx
    │   ├── EmployeeTable.jsx
    │   ├── EmployeeGrid.jsx
    │   ├── EmployeeModal.jsx          # Add/Edit form
    │   ├── EmployeeDetailModal.jsx    # Read-only profile view
    │   ├── DeleteConfirmModal.jsx
    │   └── Toast.jsx
    └── utils/
        ├── initialData.js       # Seed employees, DEPARTMENTS, AVATAR_PRESETS
        ├── localStorage.js      # Read/write helpers for persistence
        └── formatters.js        # Currency/date formatting helpers



2.3 Architecture Notes

Authentication (AuthContext.jsx)

login(email, password) does not call any API — it accepts any credentials, derives a display name from the email, and assigns a role based on whether "admin" appears in the email.
The resulting user object is persisted to localStorage under the key emp_system_auth_v1 and restored on app load.
There is no password check, no session expiry, and no server-side validation — this is a front-end demo/prototype auth flow, not production-ready security.

Employee data (EmployeeContext.jsx)

Employees are held in React state and mirrored to localStorage under the key emp_system_employees_v1 on every change (via a useEffect).
addEmployee, updateEmployee, and deleteEmployee mutate this state directly; there is no backend API layer.
A resetToDefaultData() helper exists to restore the original 8 seed employees (defined in utils/initialData.js).
A lightweight in-context toast state drives the Toast component for success/info/warning notifications.

Storage keys (utils/localStorage.js)

Key	Contents
emp_system_employees_v1	Array of employee objects
emp_system_auth_v1	Current logged-in user object, or absent if logged out
2.4 Data Model

Each employee object has the shape:

json
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
department must be one of the 7 values in DEPARTMENTS (Engineering, Design, Marketing, Human Resources, Finance, Sales, Operations).
status is one of Active, On Leave, Terminated.
id is auto-generated in the form EMP-#### (random 4-digit number) unless supplied explicitly.
2.5 Local Development

Requirements: Node.js and npm.

bash
git clone https://github.com/lakshmipriyakoochi/employee-management-system-582.git
cd employee-management-system-582
npm install
npm run dev       # starts Vite dev server on http://localhost:3000

Available scripts (from package.json):

Script	Purpose
npm run dev	Start the Vite dev server (port 3000, auto-opens browser)
npm run build	Production build to dist/
npm run preview	Preview the production build locally
2.6 Deployment

The app is deployed on Vercel as a static Vite build  it deploys as a pure static site (vite build output). Any static host (Vercel, Netlify, GitHub Pages) would work equally well since all "backend" behavior is simulated client-side with localStorage.


