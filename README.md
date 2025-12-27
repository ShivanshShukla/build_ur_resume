ResumeForge 🚀

ResumeForge is a premium, AI-powered resume builder for crafting ATS-friendly resumes quickly. Featuring a modern "Teal & Slate" aesthetic, real-time preview, and drag-and-drop customization, it ensures a seamless creation-to-export experience.

✨ Features

🎨 Resume Builder

Real-Time Preview & Editing: Instant visual feedback with rich text support (bold, italic, lists).

Customization: Drag & drop reordering, custom sections, and switchable templates (Modern, Classic, Minimal).

Design Control: Professional font pairings and customizable accent colors/spacing.

🗂️ Dashboard

Management: Create, Rename, Duplicate, Lock, and Delete resumes.

Import: Parse and edit existing PDF or Word documents.

Organization: Grid/List views with instant client-side filtering.

🔐 Authentication & Security

Secure Access: JWT-based auth with OAuth support (Google, GitHub).

Verification: Email activation flow and mandatory terms acceptance.

💎 UI/UX

Premium Design: "Modern Professional" theme with fully responsive Dark Mode.

** aesthetics:** Glassmorphism elements optimized for all devices.

🛠️ Tech Stack

Frontend

Core: React 18, Vite, React Router v6

Styling & UI: Tailwind CSS, Font Awesome

State: React Hooks

Backend

Core: FastAPI (Python)

Data: MongoDB (Motor/Pymongo), Redis (Caching)

Auth & Validation: Authlib, Passlib, Python-Jose, Pydantic v2

🚀 Getting Started

Prerequisites

Node.js (v18+), Python (v3.10+)

MongoDB (Local or Atlas), Redis (Optional)

1. Clone Repository

git clone [https://github.com/yourusername/resumeforge.git](https://github.com/yourusername/resumeforge.git)
cd resumeforge


2. Backend Setup

Navigate to app/, create a virtual environment, and install dependencies:

cd app
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt


Configuration (.env):

MONGO_URI=mongodb://localhost:27017
DB_NAME=resume_builder
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=your_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
# OAuth (Optional): GOOGLE_CLIENT_ID, GITHUB_CLIENT_ID, etc.
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8000


Run Server:

uvicorn app.main:app --reload


Runs on http://localhost:8000

3. Frontend Setup

In the root directory, install dependencies and start the dev server:

npm install
npm run dev


Runs on http://localhost:5173

📂 Project Structure

├── app/                        # Backend (FastAPI)
│   ├── main.py                 # Entry point
│   ├── config.py               # Env vars
│   ├── auth.py                 # Auth logic
│   ├── models/                 # Pydantic models
│   └── routers/                # API Endpoints
│
├── src/                        # Frontend (React)
│   ├── components/
│   │   ├── builder/            # Builder Logic & UI Panels
│   │   ├── common/             # Shared UI (Navbar, Footer, Modals)
│   │   └── layout.jsx          # App Layout
│   ├── routes/                 # Pages (Home, Dashboard, etc.)
│   ├── utils/                  # API helpers
│   ├── App.jsx                 # Routing
│   └── main.jsx                # Entry point
│
└── README.md


🤝 Contributing

Fork the project.

Create a feature branch (git checkout -b feature/NewFeature).

Commit changes (git commit -m 'Add NewFeature').

Push to the branch and open a Pull Request.

📄 License

Distributed under the MIT License. See LICENSE for details.
