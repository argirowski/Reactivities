using Application.HandlerResult;
using Application.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Features.Commands
{
    public class AddPhoto
    {
        public class Command : IRequest<Result<Photo>>
        {
            public required IFormFile File { get; set; }
        }

        public class Handler(IUserAccessor userAccessor, AppDbContext appDbContext, IPhotoService photoService) : IRequestHandler<Command, Result<Photo>>
        {
            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var uploadResult = await photoService.UploadPhoto(request.File);
                if (uploadResult == null)
                {
                    return Result<Photo>.Failure("Failed to upload photo", 400);
                }

                var user = await userAccessor.GetUserAsync();

                var photo = new Photo
                {
                    Url = uploadResult.Url,
                    PublicId = uploadResult.PublicId,
                    UserId = user.Id
                };

                if (user.ImageUrl == null)
                {
                    user.ImageUrl = photo.Url;
                }

                appDbContext.Photos.Add(photo);

                var result = await appDbContext.SaveChangesAsync(cancellationToken) > 0;

                if (result)
                {
                    return Result<Photo>.Success(photo);
                }
                else
                {
                    return Result<Photo>.Failure("Failed to add photo", 400);
                }
            }
        }
    }
}
