namespace Jeopardy.API.DTOs;

public record JoinGameResponse(
    Guid GameId,
    string Pin,
    string Status
);