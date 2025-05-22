// This is a no-operation implementation of IEmailSender<User>.
//
// Purpose:
// ASP.NET Core Identity sometimes tries to resolve IEmailSender<User> from the root provider (singleton scope),
// but the real EmailSender depends on scoped services (like IResend). To avoid lifetime errors, we register this
// NoOpEmailSender as a singleton for Identity's internal/background use. It does nothing when called.
//
// The real EmailSender is registered as scoped and should be injected directly where actual email sending is needed.

using Domain.Entities;
using Microsoft.AspNetCore.Identity;

public class NoOpEmailSender : IEmailSender<User>
{
    public Task SendConfirmationLinkAsync(User user, string email, string confirmationLink)
        => Task.CompletedTask;
    public Task SendPasswordResetCodeAsync(User user, string email, string resetCode)
        => Task.CompletedTask;
    public Task SendPasswordResetLinkAsync(User user, string email, string resetLink)
        => Task.CompletedTask;
}
