import { Contestant } from "@/data/contestants.data";
const API_URL = "http://localhost:5238/api";

export interface CreateGameResponse {
    id: string;
    pin: string;
}

export interface GetGameResponse {
    gameId: string;
    pin: string;
    status: string;
    contestants: Contestant[]
}

export async function createGame(): Promise<CreateGameResponse> {
    const response = await fetch(`${API_URL}/games`, {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Failed to create game");
    }

    return response.json();
}

export async function getGame(gamePin: string): Promise<GetGameResponse> {
    const response = await fetch(`${API_URL}/games/${encodeURIComponent(gamePin)}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Game not found");
    }

    return response.json();
}