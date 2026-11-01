using Microsoft.AspNetCore.Mvc;
using Jeopardy.API.DTOs;
using Jeopardy.API.Services;

namespace Jeopardy.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
    private readonly GameService _gameService;

    public GamesController(GameService gameService)
    {
        _gameService = gameService;
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

    [HttpPost("join")]
    public IActionResult JoinGame([FromBody] JoinGameRequest request)
    {
        var game = _gameService.GetGameByPin(request.Pin);

        if (game == null)
            return NotFound(new { message = "Invalid game code." });

        return Ok(new JoinGameResponse(
            game.Id,
            game.Pin,
            game.Status.ToString()
        ));
    }
}