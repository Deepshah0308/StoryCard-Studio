import os
import vertexai
from vertexai.preview.vision_models import ImageGenerationModel

def test_model(model_name):
    print(f"Testing {model_name}...")
    try:
        vertexai.init(project="meeting-architect", location="us-central1")
        model = ImageGenerationModel.from_pretrained(model_name)
        images = model.generate_images(prompt="A cute cat", number_of_images=1)
        print(f"Success! Generated image size: len(images)")
        return True
    except Exception as e:
        print(f"Failed: {e}")
        return False

test_model("imagen-3.0-fast-generate-001")
test_model("imagegeneration@006")
test_model("imagen-3.0-generate-001")
