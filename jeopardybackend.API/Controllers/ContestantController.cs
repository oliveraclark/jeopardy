using Jeopardy.API.DTOs;
using Jeopardy.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Jeopardy.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContestantController: ControllerBase
    {
        private readonly ContestantService _contestantService;

        public ContestantController(ContestantService contestantService)
        {
            _contestantService = contestantService;
        }

        [HttpPost("createContestant")]
        public IActionResult CreateContestant([FromBody] CreateContestantRequest request)
        {
            var contestant = _contestantService.CreateContestant(request.Name);

            return Ok(new CreateContestantResponse
            {
                Id = contestant.Id,
                Name = contestant.Name
            });
        }

        [HttpPut("addScore")]
        public IActionResult AddScore([FromBody] AddScoreRequest request)
        {
            var contestant = _contestantService.GetContestant(request.Id);

            if(contestant == null)
            {
                return NotFound("Contestant not found");
            }

            _contestantService.AddScore(request.Id, request.Score);

            return Ok();
        }
    }
}