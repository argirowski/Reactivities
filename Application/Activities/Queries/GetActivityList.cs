using Application.DTO;
using Application.HandlerResult;
using Application.Pagination;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityList
    {
        private const int MaxPageSize = 50;
        // This is the query that will be used to get the list of activities
        public class Query : IRequest<Result<PagedList<ActivityDTO, DateTime?>>>
        {
            public DateTime? Cursor { get; set; }
            private int _pageSize = 3;

            public int PageSize
            {
                get => _pageSize;
                set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
            }

        }

        // This is the query handler that will be used to handle the query
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<PagedList<ActivityDTO, DateTime?>>>
        {
            public async Task<Result<PagedList<ActivityDTO, DateTime?>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.Activities
                    .OrderBy(x => x.Date)
                    .AsQueryable();

                if (request.Cursor.HasValue)
                {
                    query = query.Where(x => x.Date > request.Cursor.Value);
                }
                var activities = await query.Take(request.PageSize + 1).ProjectTo<ActivityDTO>(mapper.ConfigurationProvider).ToListAsync(cancellationToken);

                DateTime? nextCursor = null;

                if (activities.Count > request.PageSize)
                {
                    nextCursor = activities.Last().Date;
                    activities.RemoveAt(request.PageSize);
                }

                return Result<PagedList<ActivityDTO, DateTime?>>.Success(new PagedList<ActivityDTO, DateTime?>
                {
                    Items = activities,
                    NextCursor = nextCursor
                });
            }
        }
    }
}
