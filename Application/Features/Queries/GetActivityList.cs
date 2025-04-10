using Application.DTO;
using Application.Features.Queries;
using Application.HandlerResult;
using Application.Interfaces;
using Application.Pagination;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Queries
{
    public class GetActivityList
    {
        public class Query : IRequest<Result<PagedList<ActivityDTO, DateTime?>>>
        {
            public required ActivityParams ActivityParams { get; set; }
        }

        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) :
            IRequestHandler<Query, Result<PagedList<ActivityDTO, DateTime?>>>
        {
            public async Task<Result<PagedList<ActivityDTO, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Activities
                    .OrderBy(x => x.Date)
                    .Where(x => x.Date >= (request.ActivityParams.Cursor ?? request.ActivityParams.StartDate))
                    .AsQueryable();

                if (!string.IsNullOrEmpty(request.ActivityParams.Filter))
                {
                    query = request.ActivityParams.Filter switch
                    {
                        "isGoing" => query.Where(x =>
                            x.Attendees.Any(a => a.UserId == userAccessor.GetUserId())),
                        "isHost" => query.Where(x =>
                            x.Attendees.Any(a => a.IsHost && a.UserId == userAccessor.GetUserId())),
                        _ => query
                    };
                }

                var projectedActivities = query.ProjectTo<ActivityDTO>(mapper.ConfigurationProvider,
                        new { currentUserId = userAccessor.GetUserId() });

                var activities = await projectedActivities
                    .Take(request.ActivityParams.PageSize + 1)
                    .ToListAsync(cancellationToken);

                DateTime? nextCursor = null;
                if (activities.Count > request.ActivityParams.PageSize)
                {
                    nextCursor = activities.Last().Date;
                    activities.RemoveAt(activities.Count - 1);
                }

                return Result<PagedList<ActivityDTO, DateTime?>>.Success(
                    new PagedList<ActivityDTO, DateTime?>
                    {
                        Items = activities,
                        NextCursor = nextCursor
                    }
                );
            }
        }
    }
}