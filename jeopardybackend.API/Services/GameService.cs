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
                Status = GameStatus.Waiting
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
    }
}