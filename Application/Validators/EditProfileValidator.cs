using Application.Activities.Commands;
using FluentValidation;

namespace Application.Validators
{
    public class EditProfileValidator : AbstractValidator<EditProfile.Command>
    {
        public EditProfileValidator()
        {
            RuleFor(x => x.DisplayName).NotEmpty();
        }
    }
}
