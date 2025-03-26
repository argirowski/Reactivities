using Application.DTO;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        // This is the command that will be used to create an activity
        public class Command : IRequest<string>
        {
            public required CreateActivityDTO CreateActivityDTO { get; set; }
        }
        // This is the command handler that will be used to handle the command
        public class Handler(AppDbContext context, IMapper mapper, IValidator<Command> validator) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                await validator.ValidateAndThrowAsync(request, cancellationToken);

                var activity = mapper.Map<Activity>(request.CreateActivityDTO);

                context.Activities.Add(activity);
                await context.SaveChangesAsync(cancellationToken);
                return activity.Id;
            }
        }
    }
}
