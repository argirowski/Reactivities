using API.Middleware;
using Application.Activities.Queries;
using Application.Interfaces;
using Application.Mapping;
using Application.Validators;
using Domain;
using FluentValidation;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. // This is for dependency injection

builder.Services.AddControllers(opt =>
{
    // Add the AuthorizeFilter to the global filters collection to require authorization by default for all controllers
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors();
// Add MediatR to the container and register the services from the assembly containing the GetActivityList.Handler class
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    // Register the ValidationBehaviour class as an open generic type
    x.AddOpenBehavior(typeof(ValidationBehaviour<,>));
});

builder.Services.AddScoped<IUserAccessor, UserAccessor>();

// Add AutoMapper to the container and register the services from the assembly containing the MappingProfiles class
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

// Register the services from the assembly containing the CreateActivityValidator class
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();

builder.Services.AddTransient<ExceptionMiddleware>();
// Add Identity to the container and configure the options for the User class and the IdentityRole class
builder.Services.AddIdentityApiEndpoints<User>(opt => { opt.User.RequireUniqueEmail = true; }).AddRoles<IdentityRole>().AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddAuthorization(opt =>
{
    // Add the IsHostRequirement to the authorization options
    opt.AddPolicy("IsActivityHost", policy => policy.Requirements.Add(new IsHostRequirement()));
});

builder.Services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

var app = builder.Build();

// Configure the HTTP request pipeline. // This is for middleware

app.UseMiddleware<ExceptionMiddleware>();

//This needs to be before app.MapControllers() to allow CORS requests
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000", "https://localhost:3000"));

// Add the authentication and authorization middleware
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
// Map the Identity API endpoints for the User class
app.MapGroup("api").MapIdentityApi<User>();
// Create a scope to get the service provider
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    // Get the AppDbContext service from the service provider
    var context = services.GetRequiredService<AppDbContext>();
    // Get the UserManager service from the service provider
    var userManager = services.GetRequiredService<UserManager<User>>();
    // Call the MigrateAsync method to apply any pending migrations to the database
    await context.Database.MigrateAsync();
    // Call the SeedData method to seed the database with data
    await DbInitializer.SeedData(context, userManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
