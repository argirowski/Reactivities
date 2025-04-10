using Application.DTO;
using Application.HandlerResult;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Features.Commands
{
    public class EditProfile
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string DisplayName { get; set; } = string.Empty;
            public string Bio { get; set; } = string.Empty;
        }

        public class Handler(IUserAccessor userAccessor, AppDbContext appDbContext) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserAsync();

                user.DisplayName = request.DisplayName;
                user.Bio = request.Bio;

                var result = await appDbContext.SaveChangesAsync(cancellationToken) > 0;
                if (result)
                {
                    return Result<Unit>.Success(Unit.Value);
                }
                else
                {
                    return Result<Unit>.Failure("Failed to update profile", 400);
                }

            }
        }
    }
}