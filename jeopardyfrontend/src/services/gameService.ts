const API_URL = "http://localhost:5238/api";

export interface CreateGameResponse {
    id: string;
    pin: string;
}

export interface JoinGameResponse {
    gameId: string;
    pin: string;
    status: string;
}

export async function createGame(): Promise<CreateGameResponse> {
    const response = await fetch(`${API_URL}/games`, {
        method: "POST"
    });

    if (!response.ok) {
        throw new Error("Failed to create game");
    }

    return response.json();
}

export async function joinGame(pin: string, contestantId: string): Promise<JoinGameResponse> {
    const response = await fetch(`${API_URL}/games/join`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ pin, contestantId })
    });

    if (!response.ok) {
        throw new Error("Invalid game code");
    }

    return response.json();
}