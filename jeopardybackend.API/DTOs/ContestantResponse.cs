namespace Jeopardy.API.DTOs
{
    public class GetContestantsByPinResponse
    {
        public List<Contestant> contestants { get; set ;} = new List<Contestant>();
    };

    public class GetContestantRequest
    {
        public Contestant contestant { get; set; } = new Contestant();
    }
}