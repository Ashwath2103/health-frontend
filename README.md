# Health Unified Interface - Frontend

The modern, responsive frontend for the **Health Unified Interface**, built to provide a seamless experience for both Citizens (Patients) and Medical Professionals.

## 🎨 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Library**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Anime.js](https://animejs.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## ✨ Key Features

### 👤 Citizen Portal
- **Secure Login**: Access using ABHA Health ID.
- **Dashboard**: Overview of medical history and emergency profile.
- **Medical Timeline**: Visual history of lab reports, prescriptions, and scans.
- **Consent Manager**: Grant or revoke access to doctors.
- **Emergency Mode**: Quick access to Blood Group, Allergies, and SOS contacts.

### 🩺 Doctor Portal
- **Verified Access**: Login using Medical License ID.
- **Patient Search**: Search patients by ABHA ID.
- **Consultation Management**: View patient history (with consent) and add new records.
- **Sidebar Navigation**: Efficient workflow management.

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ashwath2103/health-frontend.git
   cd health-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
   *(Note: `--legacy-peer-deps` might be needed due to some React 19 rc conflicts with specific libraries).*

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. **Run Application**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## 🖥️ Usage

### Login Credentials (Demo)

| Portal | ID | Password |
|--------|----|----------|
| **Citizen** | `12-3456-7890-0000` | `password123` |
| **Doctor** | `DOC-88219` | `password123` |

## 📂 Project Structure

- `src/app/citizen`: Routes for Patient pages.
- `src/app/doctor`: Routes for Doctor pages.
- `src/components/ui`: Reusable Shadcn components.
- `src/store`: Zustand state management (Auth).
- `src/services`: API integration logic.

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
