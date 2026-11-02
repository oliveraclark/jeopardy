using Microsoft.AspNetCore.Mvc;
using Jeopardy.API.DTOs;
using Jeopardy.API.Services;

namespace Jeopardy.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
    private readonly GameService _gameService;
    private readonly ContestantService _contestantService;

    public GamesController(GameService gameService, ContestantService contestantService)
    {
        _gameService = gameService;
        _contestantService = contestantService;
    }

    [HttpPost]
    public IActionResult CreateGame()
    {
        var game = _gameService.CreateGame();

        return Ok(new CreateGameResponse
        {
            Id = game.Id,
            Pin = game.Pin
        });
    }

    [HttpGet("{pin:int}")]
    public IActionResult GetGame(int pin)
    {
        var game = _gameService.GetGameByPin(pin.ToString());
        if (game is null)
        {
            return NotFound(new { message = "Game not found." });
        }
        return Ok(new GetGameResponse(game.Id,
            game.Pin,
            game.Status.ToString()
        ));
    }

    [HttpPost("{pin:int}/contestants")]
    public IActionResult AddContestant(int pin, [FromBody] AddContestantRequest request)
    {
        var game = _gameService.GetGameByPin(pin.ToString());

        if (game is null)
        {
            return NotFound(new { message = "Game not found." });
        }

        var contestant = _contestantService.CreateContestant(request.Name);

        _gameService.AddContestantToGame(pin.ToString(), contestant.Id);

        return Ok(new CreateContestantResponse
        {
            Id = contestant.Id,
            Name = contestant.Name
        });
    }


}