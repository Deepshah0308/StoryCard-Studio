# StoryCard Studio

**Live App**: [https://storycard-web-94946682403.us-central1.run.app](https://storycard-web-94946682403.us-central1.run.app)
**API Endpoint**: [https://storycard-api-94946682403.us-central1.run.app](https://storycard-api-94946682403.us-central1.run.app)

Welcome to **StoryCard Studio**! This is a dynamic, GenAI-fueled web application submitted for the **Gemini Live Agent Hackathon - Creative Storyteller**.

It transforms a short user idea or context into a cohesive 5-card illustrated narrative by heavily leveraging the interleaving power and structured intelligence of **Gemini 2.5 Flash** for story-boarding, and **Imagen 3.0 Fast Generate** for art direction, fully deployed on **Google Cloud Platform**.

---

## 🛠 Features
- **Instant Story Generation:** Generates text nodes seamlessly mapped to 5 distinct "Scene Cards" in real-time.
- **Persistent Character Constancy:** Our system instructions prompt Gemini to build distinct character tokens and environmental descriptors so the visual prompts fed to Imagen iterate on a connected continuous environment rather than distinct random shots.
- **Cinematic Aesthetic Design:** Built with React/Vite, TailwindCSS, and Framer Motion, boasting a stunning dark glassmorphism system that feels premium out-of-the-box.
- **Cloud Run Native:** Designed to execute within Google Cloud Run configurations entirely statelessly.
- **Google Cloud Storage (GCS):** Uploads raw model byte-strings securely to standard Storage buckets optimized for unauthenticated edge viewing.

[Click here to view Architecture Schematic (`ARCHITECTURE.md`)](./ARCHITECTURE.md)

---

## 🚀 Quick Start - Spin-Up Instructions 

You can run this project flawlessly matching the production setup on your local machine using `Application Default Credentials`.

### 1. Prerequisites 
- An active Google Cloud Project (with billing enabled).
- The `gcloud` CLI installed.
- Python 3.12+ 
- Node.js 20+

### 2. Google Cloud Setup & Auth
Run these commands to log into your account, assign your quota billing project, and map Application Default Credentials implicitly.
```bash
# Login to the cloud SDK
gcloud auth login
gcloud auth application-default login

# Designate your active project for quota billing (required)
gcloud auth application-default set-quota-project YOUR_PROJECT_ID
```
> *Ensure Vertex AI API and Google Cloud Storage APIs are enabled on your project!*

### 3. Create the Google Cloud Storage Bucket
The application relies on GCS to store and retrieve the generated images statically.
```bash
# Create the bucket (replace storycard-images-prod if necessary)
gcloud storage buckets create gs://storycard-images-prod --location=us-central1

# Disable Public Access Prevention
gcloud storage buckets update gs://storycard-images-prod --no-public-access-prevention

# Make bucket universally readable
gcloud storage buckets add-iam-policy-binding gs://storycard-images-prod \
  --member="allUsers" \
  --role="roles/storage.objectViewer"
```
*(Optionally setup CORS - a script `backend/set_cors.py` can handle this programatically)*

### 4. Running the Backend (FastAPI)
Create a `.env` file in the `backend/` directory referencing your configuration:
```env
GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID
GCS_BUCKET_NAME=storycard-images-prod
GEMINI_MODEL=gemini-2.5-flash
IMAGEN_MODEL=imagen-3.0-fast-generate-001
```

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 5. Running the Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

Visit **http://localhost:5173/** in your browser and try your first story!

---

## ☁️ Deploying to Cloud Run

This project is built directly referencing `Container` optimization to easily deploy the backend logic permanently into a Cloud Run service using Google Cloud Build.

### 1. Backend Deployment

Inside the `backend/` directory, ensure your `Dockerfile` is valid, and deploy using the `gcloud run deploy` prompt:

```bash
cd backend
gcloud run deploy storycard-api \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars=GOOGLE_CLOUD_PROJECT=YOUR_PROJECT_ID,GCS_BUCKET_NAME=storycard-images-prod,GEMINI_MODEL=gemini-2.5-flash,IMAGEN_MODEL=imagen-3.0-fast-generate-001
```

Once complete, your console will output a stable `Service URL`.

### 2. Frontend Deployment

Inside the `frontend/` directory, update `VITE_API_BASE` in `.env.production` to your Backend URL, then deploy:

```bash
cd frontend
gcloud run deploy storycard-web \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 🏅 Hackathon Submission Verification
- [x] **Working App**: Verified end-to-end Local and Containerized capabilities.
- [x] **Public GitHub Repo**: Submitted.
- [x] **README**: Fully composed with local testing constraints AND standard deployment workflows. 
- [x] **Architecture Diagram**: Linked clearly to illustrate the Cloud Run / Vertex AI topology flow.
- [x] **Proof of GCP Deployment**: Services live on Cloud Run.
- [x] **Demo Video**: Uploaded to YouTube (English, <4 mins).
- [x] **Devpost submission**: Fully populated.
