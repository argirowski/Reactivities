﻿using Application.DTO;
using Application.HandlerResult;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands
{
    public class AddComment
    {
        public class Command : IRequest<Result<CommentDTO>>
        {
            public required string Body { get; set; }
            public required string ActivityId { get; set; }
        }

        public class Handler(AppDbContext appDbContext, IMapper mapper, IUserAccessor userAccessor)
            : IRequestHandler<Command, Result<CommentDTO>>
        {
            public async Task<Result<CommentDTO>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await appDbContext.Activities
                    .Include(x => x.Comments)
                .ThenInclude(x => x.User)
                    .FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);

                if (activity == null) return Result<CommentDTO>.Failure("Could not find activity", 404);

                var user = await userAccessor.GetUserAsync();

                var comment = new Comment
                {
                    UserId = user.Id,
                    ActivityId = activity.Id,
                    Body = request.Body
                };
                activity.Comments.Add(comment);
                var result = await appDbContext.SaveChangesAsync(cancellationToken) > 0;
                return result
                    ? Result<CommentDTO>.Success(mapper.Map<CommentDTO>(comment))
                    : Result<CommentDTO>.Failure("Failed to add comment", 400);
            }
        }
    }
}
