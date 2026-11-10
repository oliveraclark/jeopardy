using System.Security.Cryptography;
using Jeopardy.API.Models;
using Jeopardy.API.Repositories;

namespace Jeopardy.API.Services
{
    public class GameService
    {
        private readonly IGameRepository _repository;
        private readonly IContestantRepository _contestantRepository;

        public GameService(
            IGameRepository repository,
            IContestantRepository contestantRepository)
        {
            _repository = repository;
            _contestantRepository = contestantRepository;
        }

        public Game CreateGame()
        {
            string pin;

            do
            {
                pin = RandomNumberGenerator
                    .GetInt32(1000, 10000)
                    .ToString();
            }
            while (_repository.GetByPin(pin) != null);

            var game = new Game
            {
                Id = Guid.NewGuid(),
                Pin = pin,
                CreatedAt = DateTime.UtcNow,
                BuzzerStatus = BuzzerStatus.NotActive
            };

            _repository.Add(game);

            return game;
        }

        public Game? GetGameByPin(string pin)
        {
            if (pin.Length != 4 || !pin.All(char.IsDigit))
                return null;

            return _repository.GetByPin(pin);
        }

        public Game? AddContestantToGame(string pin, Guid contestantId)
        {
            var game = GetGameByPin(pin);
            var contestant = _contestantRepository.GetContestant(contestantId);

            if (game is null || contestant is null)
                return null;

            if (!_repository.AddContestant(game, contestant))
                return null;

            return game;
        }

        public void AddAnsweredQuestion(string pin, string questionId)
        {
            var game = GetGameByPin(pin);

            if(game == null)
            {
                throw new Exception("Not Found, how did you get here?! Stop trying to hack me or else");
            }
            
            _repository.AddAnsweredQuestion(game.Id, questionId);
        }

        public void SwitchBuzzerStatus(string pin, BuzzerStatus buzzerStatus, string? questionId)
        {
            var game = GetGameByPin(pin);

            if(game == null)
            {
                throw new Exception("Not Found, how did you get here?! Stop trying to hack me or else");
            }

            _repository.ChangeBuzzerStatus(game.Id, buzzerStatus, questionId);
        }
    }
}