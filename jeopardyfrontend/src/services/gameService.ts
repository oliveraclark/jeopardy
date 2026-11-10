import { Contestant } from "@/data/contestants.data";
import { BuzzerStatus } from "@/types/game.types";
const API_URL = "http://localhost:5238/api";

export interface CreateGameResponse {
    id: string;
    pin: string;
}

export interface GetGameResponse {
    gameId: string;
    pin: string;
    status: string;
    contestants: Contestant[],
    answeredQuestionIds: string[]
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

export async function switchBuzzers(gamePin: string, status: BuzzerStatus, questionId: string | null): Promise<Response> {
    const response = await fetch(`${API_URL}/games/${encodeURIComponent(gamePin)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: status, questionId: questionId })
    });

    if (!response.ok) {
        throw new Error("Game not found");
    }

    return response;
}