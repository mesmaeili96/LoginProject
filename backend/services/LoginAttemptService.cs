using System.Collections.Concurrent;

namespace backend.Services;

public class LoginAttemptService : ILoginAttemptService
{
    private readonly ConcurrentDictionary<string, int>
        _failedAttempts = new();

    private readonly ConcurrentDictionary<string, DateTime>
        _blockedUsers = new();

    private const int BlockMinutes = 1;

    public bool IsBlocked(
        string email,
        out DateTime blockedUntil)
    {
        if (_blockedUsers.TryGetValue(
                email,
                out blockedUntil))
        {
            if (DateTime.UtcNow < blockedUntil)
            {
                return true;
            }

            Reset(email);
        }

        return false;
    }

    public int RegisterFailedAttempt(string email)
    {
        return _failedAttempts.AddOrUpdate(
            email,
            1,
            (_, currentValue) => currentValue + 1
        );
    }

    public void Block(string email)
    {
        _blockedUsers[email] =
            DateTime.UtcNow.AddMinutes(BlockMinutes);
    }

    public void Reset(string email)
    {
        _failedAttempts.TryRemove(email, out _);
        _blockedUsers.TryRemove(email, out _);
    }

    public DateTime? GetBlockedUntil(string email)
    {
        if (_blockedUsers.TryGetValue(
                email,
                out var blockedUntil))
        {
            return blockedUntil;
        }

        return null;
    }
}