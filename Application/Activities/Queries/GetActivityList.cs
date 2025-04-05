using Application.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityList
    {
        // This is the query that will be used to get the list of activities
        public class Query : IRequest<List<ActivityDTO>> { }

        // This is the query handler that will be used to handle the query
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, List<ActivityDTO>>
        {
            public async Task<List<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Activities.ProjectTo<ActivityDTO>(mapper.ConfigurationProvider).ToListAsync(cancellationToken);
            }
        }
    }
}
