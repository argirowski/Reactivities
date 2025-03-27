using Application.Activities.Commands;
using Application.DTO;
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
