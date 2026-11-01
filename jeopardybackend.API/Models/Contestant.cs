using System.ComponentModel.DataAnnotations;

public class Contestant
{
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }
    public int Score { get; set; } = 0;
}