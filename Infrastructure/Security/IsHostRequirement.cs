using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Security.Claims;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement

    {
        // This class is empty because it is used as a marker for the authorization handler
        // The actual logic is implemented in the IsHostRequirementHandler class
    }
    public class IsHostRequirementHandler(AppDbContext appDbContext, IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<IsHostRequirement>
    {
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return;
            }

            var httpContext = httpContextAccessor.HttpContext;

            if (httpContext?.GetRouteValue("id") is not string activityId)
            {
                return;
            }

            var attendee = await appDbContext.ActivityAttendees
                // Use AsNoTracking to improve performance for read-only queries
                .AsNoTracking()
                .SingleOrDefaultAsync(x => x.UserId == userId && x.ActivityId == activityId);

            if (attendee == null)
            {
                return;
            }

            if (attendee.IsHost)
            {
                context.Succeed(requirement);
            }
        }
    }
}
