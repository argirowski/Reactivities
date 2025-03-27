using Application.DTO;
using Application.HandlerResult;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class EditActivity
    {
        // This is the command that will be used to edit an activity
        public class Command : IRequest<Result<Unit>>
        {
            public required EditActivityDTO EditActivityDTO { get; set; }
        }
        // This is the command handler that will be used to handle the command
        public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.EditActivityDTO.Id], cancellationToken);

                if (activity == null)
                {
                    return Result<Unit>.Failure("Activity Not Found", 404);
                }

                mapper.Map(request.EditActivityDTO, activity);

                var result = await context.SaveChangesAsync(cancellationToken) > 0;

                if (!result)
                {
                    return Result<Unit>.Failure("Failed to Edit the Activity", 400);
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
