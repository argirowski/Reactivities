﻿using System.ComponentModel.DataAnnotations;

namespace Application.DTO
{
    public class ChangePasswordDTO
    {
        [Required]
        public string CurrentPassword { get; set; } = "";

        [Required]
        public string NewPassword { get; set; } = "";
    }
}
