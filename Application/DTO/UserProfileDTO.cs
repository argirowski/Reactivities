namespace Application.DTO
{
    public class UserProfileDTO
    {
        public required string Id { get; set; }
        public required string DisplayName { get; set; }
        public string? Bio { get; set; }
        public required string? ImageUrl { get; set; }
    }
}
