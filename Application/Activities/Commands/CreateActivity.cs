using Application.DTO;
using Application.HandlerResult;
using Application.Interfaces;
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
        public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
        {
            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();

                var activity = mapper.Map<Activity>(request.CreateActivityDTO);

                context.Activities.Add(activity);

                var attendee = new ActivityAttendee
                {
                    ActivityId = activity.Id,
                    UserId = user.Id,
                    IsHost = true
                };

                activity.Attendees.Add(attendee);

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
