namespace Jeopardy.API.Models;
using System.ComponentModel.DataAnnotations;


public class Game
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    public string Pin { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }

    public BuzzerStatus BuzzerStatus { get; set; } = BuzzerStatus.NotActive;

    public List<Contestant> Contestants { get; set; } = new();

    public List<string> AnsweredQuestionIds { get; set; } = new List<string>();

    public string? SelectedQuestionId { get; set; } = null;
}

public enum BuzzerStatus
{
    Active,
    NotActive
}