using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityList
    {
        // This is the query that will be used to get the list of activities
        public class Query : IRequest<List<Activity>> { }

        // This is the query handler that will be used to handle the query
        public class Handler(AppDbContext context) : IRequestHandler<Query, List<Activity>>
        {
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await context.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}
