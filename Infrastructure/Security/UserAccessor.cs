using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Security.Claims;

namespace Infrastructure.Security
{
    public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
    {
        public async Task<User> GetUserAsync()
        {
            return await dbContext.Users.FindAsync(GetUserId()) ?? throw new UnauthorizedAccessException("No User Is Logged In");
        }

        public string GetUserId()
        {
            return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("No User Found");
        }

        public async Task<User> GetUserWithPhotosAsync()
        {
            var userId = GetUserId();

            return await dbContext.Users.Include(z => z.Photos).FirstOrDefaultAsync(c => c.Id == userId) ?? throw new UnauthorizedAccessException("No User Is Logged In");
        }
    }
}
