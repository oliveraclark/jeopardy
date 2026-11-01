namespace Jeopardy.API.Models;

public interface IContestantRepository
{
    Contestant GetContestant(Guid id);

    void Add(Contestant contestant);

    void AddScore(Guid id, int score);

}