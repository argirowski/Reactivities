﻿using Application.HandlerResult;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string TargetUserId { get; set; }
        }

        public class Handler(AppDbContext appDbContext, IUserAccessor userAccessor)
            : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await userAccessor.GetUserAsync();
                var target = await appDbContext.Users.FindAsync([request.TargetUserId],
                    cancellationToken);

                if (target == null) return Result<Unit>.Failure("Target user not found", 400);

                var following = await appDbContext.UserFollowings
                    .FindAsync([observer.Id, target.Id], cancellationToken);

                if (following == null) appDbContext.UserFollowings.Add(new UserFollowing
                {
                    ObserverId = observer.Id,
                    TargetId = target.Id
                });
                else appDbContext.UserFollowings.Remove(following);

                return await appDbContext.SaveChangesAsync(cancellationToken) > 0
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Problem updating following", 400);
            }
        }
    }
}
