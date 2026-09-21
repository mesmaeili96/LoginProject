namespace backend.Services;

public interface ILoginAttemptService
{
    bool IsBlocked(
        string email,
        out DateTime blockedUntil);

    int RegisterFailedAttempt(string email);

    void Block(string email);

    void Reset(string email);

    DateTime? GetBlockedUntil(string email);
}