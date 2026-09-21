using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(
        IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public IActionResult Login(
        [FromBody] LoginRequest request)
    {
        var result =
            _authService.Login(request);

        if (result.IsBlocked)
        {
            return StatusCode(
                StatusCodes.Status429TooManyRequests,
                new
                {
                    message = result.Message,
                    blockedUntil = result.BlockedUntil
                }
            );
        }

        if (!result.Success)
        {
            return Unauthorized(new
            {
                message = result.Message
            });
        }

        return Ok(new LoginResponse
        {
            Message = result.Message,
            Token = result.Token!
        });
    }

    [Authorize]
    [HttpGet("profile")]
    public IActionResult Profile()
    {
        var email =
            User.FindFirst(
                ClaimTypes.Email
            )?.Value;

        return Ok(new
        {
            message = "You are authorized.",
            email
        });
    }
}