using Jeopardy.API.Models;

namespace Jeopardy.API.Repositories;

public class ContestantRepository : IContestantRepository
{

    private readonly Dictionary<Guid, Contestant> _contestants = new();

    public void Add(Contestant contestant)
    {
        lock (_contestants)
        {
            _contestants.Add(contestant.Id, contestant);
        }

    }

    public void AddScore(Guid id, int score)
    {
        lock (_contestants)
        {
            if (!_contestants.TryGetValue(id, out var existingContestant))
            {
                throw new KeyNotFoundException(
                    $"Contestant with ID '{id}' was not found.");
            }

            existingContestant.Score += score;
        }
    }

    public Contestant? GetContestant(Guid id)
    {
        lock (_contestants)
        {
            return _contestants.GetValueOrDefault(id);
        }
    }
}