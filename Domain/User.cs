using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class User : IdentityUser
    {
        public string? DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? ImageUrl { get; set; }

        //navigation property
        public ICollection<ActivityAttendee> Activities { get; set; } = new List<ActivityAttendee>();
        public ICollection<Photo> Photos { get; set; } = new List<Photo>();
        // Many-to-many relationship: Users following other users
        // This collection represents the users that this user is following
        public ICollection<UserFollowing> Followings { get; set; } = []; // this is the person who is being followed
        // Many-to-many relationship: Users being followed by other users
        // This collection represents the users that are following this user
        public ICollection<UserFollowing> Followers { get; set; } = []; // this is the person who is following
    }
}
