using API.Middleware;
using Application.Activities.Queries;
using Application.Mapping;
using Application.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. // This is for dependency injection

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors();
// Add MediatR to the container and register the services from the assembly containing the GetActivityList.Handler class
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    // Register the ValidationBehaviour class as an open generic type
    x.AddOpenBehavior(typeof(ValidationBehaviour<,>));
});

// Add AutoMapper to the container and register the services from the assembly containing the MappingProfiles class
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

// Register the services from the assembly containing the CreateActivityValidator class
builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();

builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline. // This is for middleware

app.UseMiddleware<ExceptionMiddleware>();

//This needs to be before app.MapControllers() to allow CORS requests
app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000", "https://localhost:3000"));

app.MapControllers();
// Create a scope to get the service provider
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
