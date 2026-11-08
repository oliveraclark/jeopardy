import { Contestant } from "@/data/contestants.data";

const API_URL = "http://localhost:5238/api";

export interface AddContestantRequest {
    name: string;
    gamePin: string;
}

export interface AddScoreRequest {
    gamePin: string,
    id: string;
    score: number;
}

export interface GetContestantsByPinRequest {
    gamePin: string
}

export interface GetContestantRequest {
    gamePin: string,
    id: string
}

export interface GetContestantResponse {
    contestant: Contestant
}

export interface AddContestantResponse {
    id: string;
    name: string;
}

export interface GetContestantsByPinResponse {
    contestants: Contestant[]
}



export async function addContestant(
    request: AddContestantRequest
): Promise<AddContestantResponse> {
    const response = await fetch(
        `${API_URL}/games/${request.gamePin}/contestants`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: request.name
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create contestant");
    }

    return response.json();
}

export async function getContestantsByPin(
    request: GetContestantsByPinRequest
): Promise<GetContestantsByPinResponse> {
    const response = await fetch(
        `${API_URL}/games/${request.gamePin}/contestants`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create contestant");
    }

    return response.json();
}

export async function getContestantById(
    request: GetContestantRequest
): Promise<GetContestantResponse> {
    const response = await fetch(
        `${API_URL}/games/${request.gamePin}/contestants/${request.id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create contestant");
    }

    return response.json();
}

export async function addScore(request: AddScoreRequest): Promise<void> {
    const response = await fetch(`${API_URL}/games/${request.gamePin}/contestants`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });

    if (!response.ok) {
        throw new Error("Failed to add score");
    }
}