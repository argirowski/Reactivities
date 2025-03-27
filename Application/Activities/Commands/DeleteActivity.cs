using Application.HandlerResult;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class DeleteActivity
    {
        // This is the command that will be used to delete an activity
        public class Command : IRequest<Result<Unit>>
        {
            public required string Id { get; set; }
        }
        // This is the command handler that will be used to handle the command
        public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.Id], cancellationToken);

                if (activity == null)
                {
                    return Result<Unit>.Failure("Activity Not Found", 404);
                }

                context.Remove(activity);
                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failed to Delete the Activity", 400);
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
