using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using test.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("TodoDb"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("TodoDb"))
    ));

builder.Services.AddControllers();

// Build the application.
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseDefaultFiles();
app.UseStaticFiles();
app.Run();