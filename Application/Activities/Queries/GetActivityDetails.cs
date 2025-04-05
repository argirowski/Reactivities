using Application.DTO;
using Application.HandlerResult;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityDetails
    {
        // This is the query that will be used to get the details of an activity
        public class Query : IRequest<Result<ActivityDTO>>
        {
            public required string Id { get; set; }
        }

        // This is the query handler that will be used to handle the query
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<ActivityDTO>>
        {
            public async Task<Result<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                // ProjectTo is used to project the data from the database to the DTO
                var activity = await context.Activities.ProjectTo<ActivityDTO>(mapper.ConfigurationProvider).FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);

                if (activity == null)
                {
                    return Result<ActivityDTO>.Failure("Activity Not Found", 404);
                }
                return Result<ActivityDTO>.Success(activity);
            }
        }
    }
}
