using Application.DTO;
using Application.HandlerResult;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        // This is the command that will be used to create an activity
        public class Command : IRequest<Result<string>>
        {
            public required CreateActivityDTO CreateActivityDTO { get; set; }
        }
        // This is the command handler that will be used to handle the command
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
        {
            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {

                var activity = mapper.Map<Activity>(request.CreateActivityDTO);

                context.Activities.Add(activity);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                {
                    return Result<string>.Failure("Failed to Create an Activity", 400);
                }

                return Result<string>.Success(activity.Id);
            }
        }
    }
}
