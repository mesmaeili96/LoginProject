using backend.Models;

namespace backend.Services;

public class AuthService : IAuthService
{
    private readonly ITokenService _tokenService;

    private readonly ILoginAttemptService
        _loginAttemptService;

    private const int MaxFailedAttempts = 3;

    public AuthService(
        ITokenService tokenService,
        ILoginAttemptService loginAttemptService)
    {
        _tokenService = tokenService;
        _loginAttemptService = loginAttemptService;
    }

    public AuthResult Login(LoginRequest request)
    {
        var email =
            request.Email
                .Trim()
                .ToLowerInvariant();

        if (_loginAttemptService.IsBlocked(
                email,
                out var blockedUntil))
        {
            return new AuthResult
            {
                Success = false,
                IsBlocked = true,
                Message =
                    "Too many failed attempts. You are temporarily blocked.",
                BlockedUntil = blockedUntil
            };
        }

        var isValidUser =
            email == "admin@test.com" &&
            request.Password == "123456";

        if (!isValidUser)
        {
            var attempts =
                _loginAttemptService
                    .RegisterFailedAttempt(email);

            if (attempts >= MaxFailedAttempts)
            {
                _loginAttemptService.Block(email);

                return new AuthResult
                {
                    Success = false,
                    IsBlocked = true,
                    Message =
                        "Too many failed attempts. Account blocked.",
                    BlockedUntil =
                        _loginAttemptService
                            .GetBlockedUntil(email)
                };
            }

            var remaining =
                MaxFailedAttempts - attempts;

            return new AuthResult
            {
                Success = false,
                Message =
                    $"Invalid email or password. {remaining} attempts remaining."
            };
        }

        _loginAttemptService.Reset(email);

        var token =
            _tokenService.CreateToken(email);

        return new AuthResult
        {
            Success = true,
            Message = "Login successful.",
            Token = token
        };
    }
}