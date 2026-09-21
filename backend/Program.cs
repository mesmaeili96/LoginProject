using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// Controllers


builder.Services.AddControllers();



// Application Services


builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddScoped<ITokenService, JwtTokenService>();

builder.Services.AddSingleton<
    ILoginAttemptService,
    LoginAttemptService
>();



// CORS


builder.Services.AddCors(options =>
{
    options.AddPolicy("NextJs", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});




builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,

                ValidateAudience = true,

                ValidateLifetime = true,

                ValidateIssuerSigningKey = true,

                ValidIssuer =
                    builder.Configuration["Jwt:Issuer"],

                ValidAudience =
                    builder.Configuration["Jwt:Audience"],

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(
                            builder.Configuration["Jwt:Key"]!
                        )
                    )
            };
    });



// Authorization


builder.Services.AddAuthorization();


var app = builder.Build();



// Middleware


app.UseCors("NextJs");

app.UseAuthentication();

app.UseAuthorization();


// Controllers


app.MapControllers();


app.Run();