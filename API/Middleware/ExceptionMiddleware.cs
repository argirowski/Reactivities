using Microsoft.AspNetCore.Mvc;
using ValidationException = FluentValidation.ValidationException;

namespace API.Middleware
{
    public class ExceptionMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (ValidationException ex)
            {
                await HandleValitionException(context, ex);
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
            }
        }

        private static async Task HandleValitionException(HttpContext context, ValidationException ex)
        {
            var validationErrors = new Dictionary<string, string[]>();
            if (ex.Errors != null)
            {
                foreach (var error in ex.Errors)
                {
                    if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                    {
                        validationErrors[error.PropertyName] = existingErrors.Append(error.ErrorMessage).ToArray();
                    }
                    else
                    {
                        validationErrors[error.PropertyName] = new[] { error.ErrorMessage };

                    }
                }
            }
            context.Response.StatusCode = StatusCodes.Status400BadRequest;

            var validationProblemDetails = new ValidationProblemDetails(validationErrors)
            {
                Type = "ValidationFailure",
                Title = "One or more validation errors occurred",
                Status = StatusCodes.Status400BadRequest,
                Detail = "See the errors property for details",
            };

            await context.Response.WriteAsJsonAsync(validationProblemDetails);
        }
    }
}