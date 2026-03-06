import os
import json
from google.cloud import storage
import logging

logger = logging.getLogger(__name__)

class StorageService:
    def __init__(self):
        self.client = storage.Client(project=os.getenv("GOOGLE_CLOUD_PROJECT"))
        bucket_name = os.getenv("GCS_BUCKET_NAME")
        if not bucket_name:
            raise ValueError("GCS_BUCKET_NAME environment variable is not set")
        self.bucket = self.client.bucket(bucket_name)

    def upload_image(self, story_id: str, index: int, image_bytes: bytes) -> str:
        blob_name = f"stories/{story_id}/card_{index}.jpg"
        blob = self.bucket.blob(blob_name)
        
        blob.upload_from_string(image_bytes, content_type="image/jpeg")
        
        return f"https://storage.googleapis.com/{self.bucket.name}/{blob_name}"

    def upload_json(self, story_id: str, data: dict) -> str:
        blob_name = f"stories/{story_id}/story.json"
        blob = self.bucket.blob(blob_name)
        
        blob.upload_from_string(json.dumps(data), content_type="application/json")
        
        return f"https://storage.googleapis.com/{self.bucket.name}/{blob_name}"
