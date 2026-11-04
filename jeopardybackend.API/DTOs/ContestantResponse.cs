namespace Jeopardy.API.DTOs
{
    public class GetContestantsByPinResponse
    {
        public List<Contestant> contestants { get; set ;} = new List<Contestant>();
    };
}