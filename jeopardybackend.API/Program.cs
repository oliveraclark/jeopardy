using Jeopardy.API.Repositories;
using Jeopardy.API.Services;
using Jeopardy.API.Models;
using Jeopardy.API.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddControllers();

builder.Services.AddSingleton<IGameRepository, GameRepository>();
builder.Services.AddScoped<GameService>();
builder.Services.AddSingleton<IContestantRepository, ContestantRepository>();
builder.Services.AddScoped<ContestantService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("ReactApp");
app.MapControllers();
app.MapHub<GameHub>("/gameHub");

app.Run();
