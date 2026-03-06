# StoryCard Studio - Architecture

The architecture of StoryCard Studio is built around Google Cloud capabilities, combining the latest Google Gemini models with the fast generation capabilities of Imagen to orchestrate an end-to-end interactive story creation system.

## System Workflow Diagram

```mermaid
graph TD
    classDef user fill:#6366f1,stroke:#fff,stroke-width:2px,color:#fff;
    classDef frontend fill:#1e293b,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef backend fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef gcp fill:#0f172a,stroke:#10b981,stroke-width:2px,color:#fff;
    
    User((User)):::user
    
    subgraph Client [Browser Environment]
        UI["React/Vite Frontend (StoryCard Studio)"]:::frontend
    end
    
    subgraph Server [Google Cloud Run]
        API[FastAPI Backend]:::backend
    end
    
    subgraph VertexAI [Google Cloud Vertex AI]
        Gemini["Gemini 2.5 Flash<br/>(Narrative & Scene Generation)"]:::gcp
        Imagen["Imagen 3.0 Fast Generate<br/>(Image Generation)"]:::gcp
    end
    
    subgraph GCS [Google Cloud Storage]
        Bucket[("(storycard-images-prod Bucket)")]:::gcp
    end
    
    %% Interactions
    User -- "Inputs Topic/Context" --> UI
    UI -- "POST /api/storycards\n(JSON Payload)" --> API
    
    API -- "1. Structured Prompt" --> Gemini
    Gemini -- "Returns 5 JSON Scenes\n(Title, Caption, Prompt)" --> API
    
    API -- "2. Loops Visual Prompts\n1 by 1" --> Imagen
    Imagen -- "Returns Raw Bytes" --> API
    
    API -- "3. Uploads image bytes" --> Bucket
    Bucket -- "Returns Public URL" --> API
    
    API -- "4. Returns Story Config\n+ Image URLs" --> UI
    
    UI -- "5. Mounts unauthenticated img tags" --> Bucket
    Bucket -- "Image Bytes streamed" --> UI
    
    UI -- "Renders Interactive Carousel" --> User
```

## Architecture Flow Description
1. **User Input:** A user opens the React frontend hosted at `https://storycard-web-94946682403.us-central1.run.app` and enters a prompt.
2. **Server Request:** The browser sends a POST request with the user's idea to the FastAPI backend running at `https://storycard-api-94946682403.us-central1.run.app`.
3. **Narrative Generation:** The backend engages **Gemini 2.5 Flash** using Vertex AI, leveraging 'Structured Outputs' via Pydantic classes to generate exactly 5 distinct conceptual cards containing localized image generation prompts for character consistency.
4. **Image Synthesis:** The backend loops through the outputted structures, and pings the model API for **Imagen 3.0 Flash/Fast-generate** models sequentially with a slight pacing delay to safely conform to burst quota boundaries. 
5. **Asset Storage:** The generated image raw bytes are piped directly to a publicly-readable **Google Cloud Storage (GCS)** bucket where they are saved using `UUID` segregation patterns.
6. **Delivery:** The API returns the completed metadata alongside the GCS web-hosted image URLs, which the frontend mounts dynamically into a beautiful Framer Motion-based card carousel.
