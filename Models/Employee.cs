namespace EmployeeApi.Models;

public class Employee
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    
    // Links to Supabase Auth User ID
    public string? SupabaseUserId { get; set; }
    
    public int DepartmentId { get; set; }
    public Department? Department { get; set; }

    public ICollection<AttendanceRecord> AttendanceRecords { get; set; } = new List<AttendanceRecord>();
}
