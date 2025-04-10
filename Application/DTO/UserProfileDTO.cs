﻿namespace Application.DTO
{
    public class UserProfileDTO
    {
        public required string Id { get; set; }
        public required string DisplayName { get; set; }
        public string? Bio { get; set; }
        public string? ImageUrl { get; set; }
        public bool Following { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
    }
}
