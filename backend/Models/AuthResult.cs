namespace backend.Models;

public class AuthResult
{
    public bool Success { get; set; }

    public bool IsBlocked { get; set; }

    public string Message { get; set; } = "";

    public string? Token { get; set; }

    public DateTime? BlockedUntil { get; set; }
}