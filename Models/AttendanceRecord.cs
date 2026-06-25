namespace EmployeeApi.Models;

public class AttendanceRecord
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public Employee? Employee { get; set; }
    
    public DateTime ClockInTime { get; set; }
    public DateTime? ClockOutTime { get; set; }
}
