using Jeopardy.API.Models;

namespace Jeopardy.API.Repositories;

public interface IGameRepository
{
    Game? GetById(Guid id);
    Game? GetByPin(string pin);
    void Add(Game game);
    bool AddContestant(Game game, Contestant contestant);
    void AddAnsweredQuestion(Guid id, string questionId);
    void ChangeBuzzerStatus(Guid id, BuzzerStatus buzzerStatus, string? questionId);
}