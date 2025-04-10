using Application.Features.Commands;
using Application.DTO;
using FluentValidation;

namespace Application.Validators
{
    public class EditActivityValidator : BaseActivityValidator<EditActivity.Command, EditActivityDTO>
    {
        public EditActivityValidator() : base(x => x.EditActivityDTO)
        {
            RuleFor(x => x.EditActivityDTO.Id).NotEmpty().WithMessage("Id is required");
        }
    }
}
