export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    departmentId: number;
}

const API_BASE_URL = 'https://employee-api-production-e00b.up.railway.app/api';

export const fetchEmployees = async (): Promise<Employee[]> => {
    const response = await fetch(`${API_BASE_URL}/employees`);
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }
    return response.json();
};

export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
    const response = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    });
    if (!response.ok) {
        throw new Error('Failed to create employee');
    }
    return response.json();
};
