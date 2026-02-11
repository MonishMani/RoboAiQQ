# RoboAiQ Project Overview

## 1. Project Description
**RoboAiQ** is a futuristic, premium educational platform designed to empower children with robotics, AI, and entrepreneurial thinking. The website serves as a high-performance, visually stunning portal to showcase programs, robotics kits, mentors, and success stories.

The project is built as a **Single Page Application (SPA)** using modern web technologies, focusing on "Aurora-grade" UI/UX with rich animations, 3D elements, and a mobile-first responsive design.

---

## 2. Technology Stack

### Core Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/) (using Rolldown)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Language**: JavaScript (ES Modules)

### Styling & Design
- **CSS Engine**: [Tailwind CSS v4](https://tailwindcss.com/)
- **CSS Architecture**: Modular CSS modules + Global Design Tokens (`design-tokens.css`)
- **Icons**: React Icons, Font Awesome 6
- **Fonts**: Orbitron, Rajdhani, Share Tech Mono (Google Fonts)

### Animations & 3D
- **3D Rendering**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) / [Three.js](https://threejs.org/)
- **Motion Graphics**: [Framer Motion](https://www.framer.com/motion/) / Motion
- **Complex Animations**: [GSAP](https://gsap.com/) (GreenSock)
- **Physics/Interactions**: OGL, various custom hooks for scroll and magnetic effects

---

## 3. Project Structure

### Root Directory
- **`src/`**: Main application source code
- **`public/`**: Static assets (images, videos, models)
- **`backend/`**: Backend server structure (currently in initial setup phase)
- **`dist/`**: Production build output

### Source (`src/`) Organization
- **`pages/`**: Top-level route components
  - `Home`: Main landing page
  - `AboutUsPage`: Organization vision and mission
  - `RoboticsKitPage`: Product visualization and details
  - `MentorsPage`: Expert profiles
  - `ProgramCurriculumPage`: Educational courses
  - `InsightsPage`: Blog/News section
  - `RobotTest`: 3D model testing playground
  - `PrivacyPolicy`: Legal text
- **`components/`**: Reusable UI blocks
  - **3D/Visuals**: `Hero3DModel`, `Aurora`, `Particles`, `Galaxy`, `Orb`
  - **UI Elements**: `Navbar`, `Footer`, `GlowButton`, `BookingModal`
  - **Sections**: `HeroSection`, `BenefitsSection`, `SuccessStories`, `WeRrcmJourney`
  - **Effects**: `ScrollReveal`, `TextType`, `MagneticButton`
- **`App.jsx`**: Main routing configuration
- **`main.jsx`**: Application entry point
- **`hooks/`**: Custom React hooks (e.g., `useScrollAnimation`, `useMagneticButton`)

---

## 4. Key Features

### 🎨 Visual Experience
- **Futuristic Aesthetic**: Glassmorphism, neon glows, dark mode theme.
- **Interactive 3D**: Integrated 3D robot models and particle systems.
- **Scroll Animations**: Elements reveal and animate as the user scrolls.
- **Parallax Effects**: Smooth depth layers in sections like Contact and Hero.

### 📱 Responsive Design
- **Mobile-First**: layout strategy prioritizing mobile experiences (currently being optimized).
- **Adaptive Grids**: CSS Grid and Flexbox layouts that scale from mobile to desktop.
- **Touch Optimization**: Tuned interactions for touch devices.

### 🧩 Components
- **Testimonials & Success Stories**: Carousels and grid layouts for social proof.
- **Dynamic Pricing/Curriculum**: Interactive cards for program details.
- **Contact Forms**: Integrated inquiry forms with validation styling.
- **Chatbot**: `RiaChatbot` integration for user assistance.

---

## 5. Development & Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Running Locally
Start the development server:
```bash
npm run dev
```
Access the app at `http://localhost:5173` (or port shown in terminal).

### Building for Production
Create an optimized build:
```bash
npm run build
```
Preview the build locally:
```bash
npm run preview
```

---

## 6. Current Status
- **Frontend**: Active development. Core pages implemented. "Into/Splash" screen recently removed for faster load times.
- **Backend**: Structure exists (`backend/src`) but implementation appears pending (no active backend dependencies linked in root).
- **Performance**: Focus on "Aurora-grade" responsiveness and Lighthouse score optimization.

## 7. Configuration
- **Vite**: configured in `vite.config.js` with React plugin and compression.
- **Tailwind**: configured in `package.json` (v4 detection).
- **ESLint**: configured in `eslint.config.js` for code quality.
