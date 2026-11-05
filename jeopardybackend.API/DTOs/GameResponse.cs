namespace Jeopardy.API.DTOs;

public record GetGameResponse(
    Guid GameId,
    string Pin,
    string Status,
    List<Contestant> Contestants
);

public class CreateGameResponse
{
    public Guid Id { get; set; }
    public string Pin { get; set; } = string.Empty;
}