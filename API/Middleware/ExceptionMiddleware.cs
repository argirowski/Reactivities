﻿using Application.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using ValidationException = FluentValidation.ValidationException;

namespace API.Middleware
{
    public class ExceptionMiddleware(ILogger<Exception> logger, IHostEnvironment environment) : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (ValidationException ex)
            {
                await HandleValidationException(context, ex);
            }
            catch (Exception ex)
            {

                await HandleException(context, ex);
            }
        }

        private async Task HandleException(HttpContext context, Exception ex)
        {
            logger.LogError(ex, ex.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            var response = environment.IsDevelopment()
                ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
                : new AppException(context.Response.StatusCode, ex.Message, null);

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }

        private static async Task HandleValidationException(HttpContext context, ValidationException ex)
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