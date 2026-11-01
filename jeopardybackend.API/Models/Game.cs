namespace Jeopardy.API.Models;
using System.ComponentModel.DataAnnotations;


public class Game
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    public string Pin { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    public GameStatus Status { get; set; }

    public List<Contestant> Contestants { get; set; } = new();
}

public enum GameStatus
{
    Waiting,
    InProgress,
    Finished
}