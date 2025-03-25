using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        // This is the command that will be used to create an activity
        public class Command : IRequest<string>
        {
            public required Activity Activity { get; set; }
        }
        // This is the command handler that will be used to handle the command
        public class Handler(AppDbContext context) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                context.Activities.Add(request.Activity);
                await context.SaveChangesAsync(cancellationToken);
                return request.Activity.Id;
            }
        }
    }
}
