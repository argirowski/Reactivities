using System.Text.Json.Serialization;

namespace Domain
{
    public class Photo
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Url { get; set; } = string.Empty;
        public required string PublicId { get; set; }

        //navigation property
        public required string UserId { get; set; }

        // json ignore to prevent circular reference
        [JsonIgnore]
        public User User { get; set; } = null!;
    }
}
