using Microsoft.EntityFrameworkCore;
using SupplierApi.Data;
using SupplierApi.Interfaces;
using SupplierApi.Services;
using SupplierApi.SeedData;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ISupplierService, Service>();
builder.Services.AddScoped<DatabaseSeeder>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var seeder = scope.ServiceProvider.GetRequiredService<DatabaseSeeder>();

    await seeder.SeedAsync();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("Frontend");

app.MapControllers();

app.Run();

