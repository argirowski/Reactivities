using Application.DTO;
using Application.HandlerResult;
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

        public class Handler(AppDbContext appDbContext, IMapper mapper) : IRequestHandler<Query, Result<UserProfileDTO>>
        {
            public async Task<Result<UserProfileDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profile = await appDbContext.Users.ProjectTo<UserProfileDTO>(mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);

                if (profile == null)
                {
                    return Result<UserProfileDTO>.Failure("User Profile not found", 404);
                }
                else
                {
                    return Result<UserProfileDTO>.Success(profile);
                }

            }
        }
    }
}
