namespace Jeopardy.API.DTOs
{
    public class AddScoreRequest
    {
        public Guid Id { get; set; }
        public int Score { get; set; }
    }
}