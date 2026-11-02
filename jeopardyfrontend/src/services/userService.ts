const API_URL = "http://localhost:5238/api";

export interface AddContestantRequest {
    name: string;
    gamePin: string;
}

export interface AddContestantResponse {
    id: string;
    name: string;
}

export interface AddScoreRequest {
    id: string;
    score: number;
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