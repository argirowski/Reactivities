using System.ComponentModel.DataAnnotations;

namespace Application.DTO
{
    public class RegisterDTO
    {
        [Required]
        public required string DisplayName { get; set; } = "";
        [Required]
        [EmailAddress]
        public required string Email { get; set; } = "";
        [Required]
        public required string Password { get; set; } = "";
    }
}
