using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeApi.Data;
using EmployeeApi.Models;

namespace EmployeeApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AttendanceController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AttendanceController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("clock-in")]
    public async Task<ActionResult<AttendanceRecord>> ClockIn([FromBody] int employeeId)
    {
        var employee = await _context.Employees.FindAsync(employeeId);
        if (employee == null) return NotFound("Employee not found.");

        // Check if already clocked in without a clock out
        var activeRecord = await _context.AttendanceRecords
            .FirstOrDefaultAsync(a => a.EmployeeId == employeeId && a.ClockOutTime == null);

        if (activeRecord != null) return BadRequest("Employee is already clocked in.");

        var record = new AttendanceRecord
        {
            EmployeeId = employeeId,
            ClockInTime = DateTime.UtcNow
        };

        _context.AttendanceRecords.Add(record);
        await _context.SaveChangesAsync();

        return Ok(record);
    }

    [HttpPost("clock-out")]
    public async Task<IActionResult> ClockOut([FromBody] int employeeId)
    {
        var activeRecord = await _context.AttendanceRecords
            .FirstOrDefaultAsync(a => a.EmployeeId == employeeId && a.ClockOutTime == null);

        if (activeRecord == null) return BadRequest("No active clock-in found for this employee.");

        activeRecord.ClockOutTime = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return Ok(activeRecord);
    }

    [HttpGet("records/{employeeId}")]
    public async Task<ActionResult<IEnumerable<AttendanceRecord>>> GetRecords(int employeeId)
    {
        return await _context.AttendanceRecords
            .Where(a => a.EmployeeId == employeeId)
            .OrderByDescending(a => a.ClockInTime)
            .ToListAsync();
    }
}
