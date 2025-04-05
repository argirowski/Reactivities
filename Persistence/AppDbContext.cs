using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
        public required DbSet<Activity> Activities { get; set; }
        public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.ActivityId, aa.UserId }));
            builder.Entity<ActivityAttendee>().HasOne(u => u.User).WithMany(a => a.Activities).HasForeignKey(aa => aa.UserId);
            builder.Entity<ActivityAttendee>().HasOne(a => a.Activity).WithMany(u => u.Attendees).HasForeignKey(aa => aa.ActivityId);
        }
    }
}
