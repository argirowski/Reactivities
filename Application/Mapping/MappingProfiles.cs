using Application.DTO;
using AutoMapper;
using Domain;

namespace Application.Mapping
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string? currentUserId = null;

            CreateMap<Activity, Activity>();

            CreateMap<CreateActivityDTO, Activity>();

            CreateMap<EditActivityDTO, Activity>();

            CreateMap<Activity, ActivityDTO>()
                .ForMember(d => d.HostDisplayName, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
                .ForMember(d => d.HostId, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));

            CreateMap<ActivityAttendee, UserProfileDTO>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.User.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.User.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(s =>
                s.User.Followers.Any(x => x.Observer.Id == currentUserId)));

            CreateMap<User, UserProfileDTO>()
            .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
            .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
            .ForMember(d => d.Following, o => o.MapFrom(s =>
                s.Followers.Any(x => x.Observer.Id == currentUserId)));
            CreateMap<Activity, UserActivityDTO>();

            CreateMap<Comment, CommentDTO>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
                .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
                .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));
        }
    }
}
