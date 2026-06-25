using Microsoft.EntityFrameworkCore;
using EmployeeApi.Models;

namespace EmployeeApi.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Employee> Employees { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<AttendanceRecord> AttendanceRecords { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure relationships
        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Department)
            .WithMany(d => d.Employees)
            .HasForeignKey(e => e.DepartmentId);

        modelBuilder.Entity<AttendanceRecord>()
            .HasOne(a => a.Employee)
            .WithMany(e => e.AttendanceRecords)
            .HasForeignKey(a => a.EmployeeId);
    }
}
