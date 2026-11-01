namespace Jeopardy.API.DTOs
{

    public class CreateContestantResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}