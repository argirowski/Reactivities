using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class EditActivity
    {
        // This is the command that will be used to edit an activity
        public class Command : IRequest
        {
            public required Activity Activity { get; set; }
        }
        // This is the command handler that will be used to handle the command
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken);

                if (activity == null)
                {
                    throw new Exception("Activity not found");
                }

                mapper.Map(request.Activity, activity);

                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
