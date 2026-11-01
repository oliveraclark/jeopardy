using System.Runtime.CompilerServices;
using Jeopardy.API.Models;

namespace Jeopardy.API.Services
{
    public class ContestantService
    {
        private readonly IContestantRepository _repository;

        public ContestantService(IContestantRepository repo)
        {
            _repository = repo;
        }

        public Contestant CreateContestant(string contestantName)
        {
            var contestant = new Contestant
            {
                Id = Guid.NewGuid(),
                Name = contestantName,
                Score = 0
            };

            _repository.Add(contestant);

            return contestant;

        }

        public void AddScore(Guid id, int score)
        {
            _repository.AddScore(id, score);
        }

        public Contestant GetContestant(Guid guid)
        {
            return _repository.GetContestant(guid);
        }
    }
}