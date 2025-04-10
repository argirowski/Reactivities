using Application.DTO;
using Application.HandlerResult;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetProfile
    {
        public class Query : IRequest<Result<UserProfileDTO>>
        {
            public required string UserId { get; set; }
        }

        public class Handler(AppDbContext appDbContext, IMapper mapper, IUserAccessor userAccessor)
            : IRequestHandler<Query, Result<UserProfileDTO>>
        {
            public async Task<Result<UserProfileDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profile = await appDbContext.Users
                    .ProjectTo<UserProfileDTO>(mapper.ConfigurationProvider,
                        new { currentUserId = userAccessor.GetUserId() })
                    .SingleOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);

                return profile == null
                    ? Result<UserProfileDTO>.Failure("Profile not found", 404)
                    : Result<UserProfileDTO>.Success(profile);
            }
        }
    }
}
