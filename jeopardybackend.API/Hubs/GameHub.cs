using Microsoft.AspNetCore.SignalR;

namespace Jeopardy.API.Hubs
{
    public class GameHub : Hub
    {
        // Add a client connection to a game group
        public async Task JoinGame(string gamePin)
        {
            await Groups.AddToGroupAsync(
                Context.ConnectionId,
                gamePin
            );
        }

        // Remove a client from a game group
        public async Task LeaveGame(string gamePin)
        {
            await Groups.RemoveFromGroupAsync(
                Context.ConnectionId,
                gamePin
            );
        }
    }
}