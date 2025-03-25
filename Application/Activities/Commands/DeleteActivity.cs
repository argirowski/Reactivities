using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class DeleteActivity
    {
        // This is the command that will be used to delete an activity
        public class Command : IRequest
        {
            public required string Id { get; set; }
        }
        // This is the command handler that will be used to handle the command
        public class Handler(AppDbContext context) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.Id], cancellationToken);

                context.Remove(activity);
                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
