using Jeopardy.API.Models;

namespace Jeopardy.API.Repositories;

public class GameRepository : IGameRepository
{
    private readonly Dictionary<Guid, Game> _games = new();

    public Game? GetById(Guid id)
    {
        lock (_games)
        {
            return _games.GetValueOrDefault(id);
        }
    }

    public Game? GetByPin(string pin)
    {
        lock (_games)
        {
            return _games.Values.FirstOrDefault(g => g.Pin == pin);
        }
    }

    public void Add(Game game)
    {
        lock (_games)
        {
            _games.Add(game.Id, game);
        }
    }

    public bool AddContestant(Game game, Contestant contestant)
    {
        lock (_games)
        {
            if (!_games.TryGetValue(game.Id, out var existingGame))
                return false;

            if (existingGame.Contestants.All(existing => existing.Id != contestant.Id))
                existingGame.Contestants.Add(contestant);

            return true;
        }
    }
}