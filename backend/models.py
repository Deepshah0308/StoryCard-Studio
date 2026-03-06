from pydantic import BaseModel
from typing import List, Optional

class CardConfig(BaseModel):
    title: str
    caption: str
    visual_prompt: str

class StoryConfig(BaseModel):
    summary: str
    cards: List[CardConfig]

class StoryCardRequest(BaseModel):
    topic: str
    inputText: Optional[str] = None
    style: Optional[str] = "Default"

class StoryResponseCard(BaseModel):
    title: str
    caption: str
    image_url: str

class StoryResponse(BaseModel):
    story_id: str
    summary: str
    cards: List[StoryResponseCard]
