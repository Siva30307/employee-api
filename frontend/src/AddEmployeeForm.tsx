import React, { useState } from 'react';
import { createEmployee, type Employee } from './api';

interface AddEmployeeFormProps {
    onEmployeeAdded: (employee: Employee) => void;
}

export const AddEmployeeForm: React.FC<AddEmployeeFormProps> = ({ onEmployeeAdded }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [departmentId] = useState('1');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const newEmployee = await createEmployee({
                firstName,
                lastName,
                email,
                departmentId: parseInt(departmentId, 10),
            });
            onEmployeeAdded(newEmployee);
            // Reset form
            setFirstName('');
            setLastName('');
            setEmail('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add employee');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="glass-panel">
            <h2>Add New Employee</h2>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="add-employee-form">
                <div className="form-group">
                    <label>First Name</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Jane" 
                        value={firstName} 
                        onChange={e => setFirstName(e.target.value)} 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Doe" 
                        value={lastName} 
                        onChange={e => setLastName(e.target.value)} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        placeholder="jane.doe@company.com" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Adding...' : 'Add Employee +'}
                    </button>
                </div>
            </form>
        </div>
    );
};
