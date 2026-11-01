namespace Jeopardy.API.DTOs;

public class CreateGameResponse
{
    public Guid Id { get; set; }
    public string Pin { get; set; } = string.Empty;
}