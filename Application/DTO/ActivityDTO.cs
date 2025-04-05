namespace Application.DTO
{
    public class ActivityDTO
    {
        public string Id { get; set; }
        public required string Title { get; set; }
        public DateTime Date { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public bool IsCanceled { get; set; }
        public required string HostDisplayName { get; set; }
        public required string HostId { get; set; }

        //location props
        public required string City { get; set; }
        public required string Venue { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        //navigation property
        public ICollection<UserProfileDTO> Attendees { get; set; } = new List<UserProfileDTO>();
    }
}
