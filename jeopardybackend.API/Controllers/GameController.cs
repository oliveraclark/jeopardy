using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Jeopardy.API.DTOs;
using Jeopardy.API.Services;
using Jeopardy.API.Hubs;


namespace Jeopardy.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
    private readonly GameService _gameService;
    private readonly ContestantService _contestantService;
    private readonly IHubContext<GameHub> _hubContext;
    public GamesController(GameService gameService, ContestantService contestantService, IHubContext<GameHub> hubContext)
    {
        _gameService = gameService;
        _contestantService = contestantService;
        _hubContext = hubContext;
        
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
            game.Status.ToString(),
            game.Contestants,
            game.AnsweredQuestionIds
        ));
    }

    [HttpPost("{pin:int}/contestants")]
    public async Task<IActionResult> AddContestant(int pin, [FromBody] AddContestantRequest request)
    {
        var game = _gameService.GetGameByPin(pin.ToString());

        if (game is null)
        {
            return NotFound(new { message = "Game not found." });
        }

        var contestant = _contestantService.CreateContestant(request.Name);

        _gameService.AddContestantToGame(pin.ToString(), contestant.Id);

        await _hubContext.Clients
            .Group(pin.ToString())
            .SendAsync("ContestantJoined", contestant);

        return Ok(new CreateContestantResponse
        {
            Id = contestant.Id,
            Name = contestant.Name
        });
    }

    [HttpGet("{pin:int}/contestants")]
    public IActionResult GetContestantsByPin(int pin)
    {
        var game = _gameService.GetGameByPin(pin.ToString());

        if (game is null)
        {
            return NotFound(new { message = "Game not found." });
        }

        return Ok(new GetContestantsByPinResponse
        {
            contestants = game.Contestants
        });
    }

    [HttpGet("{pin:int}/contestants/{id:guid}")]
    public IActionResult GetContestant(int pin, Guid id)
    {
        var game = _gameService.GetGameByPin(pin.ToString());
        var contestant = _contestantService.GetContestant(id);

        if(contestant == null || game == null)
        {
            return NotFound("Contestant or game not found");
        }

        return Ok(new GetContestantRequest
        {
            contestant = contestant
        });
    }



    [HttpPatch("{pin:int}/contestants")]
    public async Task<IActionResult> RecordQuestionAnswered(int pin, [FromBody] AddScoreRequest request)
    {
        var contestant = _contestantService.GetContestant(request.Id);
        var game = _gameService.GetGameByPin(pin.ToString());

        if(contestant == null || game == null)
        {
            return NotFound("Contestant or game not found");
        }

        _contestantService.AddScore(request.Id, request.Score);

        if(request.Score > 0)
        {
            _gameService.AddAnsweredQuestion(game.Pin, request.QuestionId);
        }

        await _hubContext.Clients
            .Group(pin.ToString())
            .SendAsync("ScoreChange", contestant.Id, request.Score, request.QuestionId);

        return Ok();
    }




}