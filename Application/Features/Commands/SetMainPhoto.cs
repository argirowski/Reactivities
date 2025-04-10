using Application.HandlerResult;
using Application.Interfaces;
using MediatR;
using Persistence;

namespace Application.Features.Commands
{
    public class SetMainPhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required string PhotoId { get; set; }
        }
        public class Handler(AppDbContext appDbContext, IUserAccessor userAccessor, IPhotoService photoService) : IRequestHandler<Command, Result<Unit>>
        {
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await userAccessor.GetUserWithPhotosAsync();

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.PhotoId);

                if (photo == null)
                {
                    return Result<Unit>.Failure("Photo not found", 400);
                }

                user.ImageUrl = photo.Url;

                var result = await appDbContext.SaveChangesAsync(cancellationToken) > 0;

                if (result)
                {
                    return Result<Unit>.Success(Unit.Value);
                }
                else
                {
                    return Result<Unit>.Failure("Problem setting up the main photo", 500);
                }
            }
        }
    }
}
