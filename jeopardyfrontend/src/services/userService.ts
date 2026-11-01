const API_URL = "http://localhost:5238/api";

export interface CreateContestantRequest {
    name: string;
}

export interface CreateContestantResponse {
    id: string;
    name: string;
}

export interface AddScoreRequest {
    id: string;
    score: number;
}

export async function createContestant(
    request: CreateContestantRequest
): Promise<CreateContestantResponse> {
    const response = await fetch(`${API_URL}/contestants/createContestant`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });

    if (!response.ok) {
        throw new Error("Failed to create contestant");
    }

    return response.json();
}

export async function addScore(request: AddScoreRequest): Promise<void> {
    const response = await fetch(`${API_URL}/contestants/addScore`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    });

    if (!response.ok) {
        throw new Error("Failed to add score");
    }
}