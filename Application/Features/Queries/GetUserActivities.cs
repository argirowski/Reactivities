using Application.DTO;
using Application.HandlerResult;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Queries
{
    public class GetUserActivities
    {
        public class Query : IRequest<Result<List<UserActivityDTO>>>
        {
            public required string UserId { get; set; }
            public required string Filter { get; set; }
        }
        public class Handler(AppDbContext appDbContext, IMapper mapper) : IRequestHandler<Query, Result<List<UserActivityDTO>>>
        {
            public async Task<Result<List<UserActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = appDbContext.ActivityAttendees
                                    .Where(x => x.UserId == request.UserId)
                                    .OrderBy(x => x.Activity.Date)
                                    .Select(x => x.Activity)
                                    .AsQueryable();

                var today = DateTime.UtcNow;

                query = request.Filter switch
                {
                    "past" => query.Where(x => x.Date <= today && x.Attendees.Any(a => a.UserId == request.UserId)),
                    "hosting" => query.Where(x => x.Attendees.Any(a => a.IsHost && a.UserId == request.UserId)),
                    _ => query.Where(x => x.Date >= today && x.Attendees.Any(a => a.UserId == request.UserId))
                };

                var projectedActivities = query.ProjectTo<UserActivityDTO>(mapper.ConfigurationProvider);

                var activities = await projectedActivities.ToListAsync(cancellationToken);

                return Result<List<UserActivityDTO>>.Success(activities);
            }
        }
    }
}
