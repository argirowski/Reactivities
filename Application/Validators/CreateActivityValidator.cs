﻿using Application.Activities.Commands;
using FluentValidation;

namespace Application.Validators
{
    public class CreateActivityValidator : AbstractValidator<CreateActivity.Command>
    {
        public CreateActivityValidator()
        {
            RuleFor(x => x.CreateActivityDTO.Title).NotEmpty().WithMessage("Title is required");
            RuleFor(x => x.CreateActivityDTO.Description).NotEmpty().WithMessage("Description is required");
        }
    }
}
