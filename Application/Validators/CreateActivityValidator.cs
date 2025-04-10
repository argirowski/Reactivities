using Application.DTO;
using Application.Features.Commands;
using FluentValidation;

namespace Application.Validators
{
    public class CreateActivityValidator : BaseActivityValidator<CreateActivity.Command, CreateActivityDTO>
    {
        public CreateActivityValidator() : base(x => x.CreateActivityDTO)
        {

        }
    }
}
