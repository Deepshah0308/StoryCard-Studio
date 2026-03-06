export interface StoryCard {
    title: string;
    caption: string;
    image_url: string;
}

export interface StoryResponse {
    story_id: string;
    summary: string;
    cards: StoryCard[];
}

export interface StoryCardRequest {
    topic: string;
    inputText?: string;
    style?: string;
}
