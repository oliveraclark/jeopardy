namespace Jeopardy.API.DTOs;

public record JoinGameRequest(string Pin, Guid ContestantId);