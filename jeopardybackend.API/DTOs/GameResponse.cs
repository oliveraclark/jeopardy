namespace Jeopardy.API.DTOs;

public record JoinGameResponse(
    Guid GameId,
    string Pin,
    string Status
);

public record GetGameResponse(
    Guid GameId,
    string Pin,
    string Status
);