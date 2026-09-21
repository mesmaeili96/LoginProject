using backend.Models;

namespace backend.Services;

public interface IAuthService
{
    AuthResult Login(LoginRequest request);
}