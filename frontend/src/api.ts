import { StoryCardRequest, StoryResponse } from './types';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

export async function generateStory(request: StoryCardRequest): Promise<StoryResponse> {
    const response = await fetch(`${API_BASE}/api/storycards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.detail || 'Failed to generate story');
    }

    return response.json();
}
