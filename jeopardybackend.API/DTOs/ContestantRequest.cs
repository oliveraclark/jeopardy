using System.Security.Cryptography.X509Certificates;

public record CreateContestantRequest(
    string name
);

public class CreateContestantResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class AddScoreRequest
    {
        public Guid Id { get; set; }
        public int Score { get; set; }
    }