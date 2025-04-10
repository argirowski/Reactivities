namespace Domain.Entities
{
    public class UserFollowing
    {
        public required string ObserverId { get; set; }
        public User Observer { get; set; } = null!; // Follower, this is the person who is following
        public required string TargetId { get; set; }
        public User Target { get; set; } = null!; // Followee, this is the person being followed
    }
}
