import { useState, useEffect } from 'react';
import { fetchEmployees, type Employee } from './api';
import { AddEmployeeForm } from './AddEmployeeForm';
import './App.css';

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Failed to load employees from the server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmployeeAdded = (newEmployee: Employee) => {
    setEmployees([...employees, newEmployee]);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>DirectoryHub</h1>
        <p>Manage your organization's talent seamlessly.</p>
      </header>

      <AddEmployeeForm onEmployeeAdded={handleEmployeeAdded} />

      <main className="glass-panel">
        <h2>Employee Roster</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <div className="loader"></div>
            <p>Loading records...</p>
          </div>
        ) : (
          <div className="employee-grid">
            {employees.length === 0 ? (
              <div className="empty-state">
                <p>No employees found. Add one above!</p>
              </div>
            ) : (
              employees.map(emp => (
                <div key={emp.id} className="employee-card">
                  <div className="employee-avatar">
                    {emp.firstName.charAt(0)}{emp.lastName.charAt(0)}
                  </div>
                  <div className="employee-info">
                    <h3>{emp.firstName} {emp.lastName}</h3>
                    <p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      {emp.email}
                    </p>
                    <span className="department-badge">Dept #{emp.departmentId}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
