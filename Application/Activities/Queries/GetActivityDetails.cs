using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityDetails
    {
        // This is the query that will be used to get the details of an activity
        public class Query : IRequest<Activity>
        {
            public required string Id { get; set; }
        }

        // This is the query handler that will be used to handle the query
        public class Handler(AppDbContext context) : IRequestHandler<Query, Activity>
        {
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.Id], cancellationToken);

                if (activity == null)
                {
                    throw new Exception("Activity not found");
                }
                return activity;
            }
        }
    }
}
