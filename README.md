# Shakuri Studios

A modern React-based marketing website for a Roblox game development and brand marketing agency. Built with React 19, TypeScript, Vite, and Tailwind CSS.

## Features

- AI-generated visuals using Google Gemini API
- Smooth scroll animations and reveal effects
- Glassmorphism design with custom animations
- Contact form integration with Formspree
- Responsive design optimized for all devices

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS
- **AI Integration:** Google Generative AI (Gemini)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- A Gemini API key ([get one here](https://aistudio.google.com/apikey))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Tigaryen/Shakuri.git
   cd Shakuri
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your_actual_api_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
shakuri-studios/
├── components/       # Reusable UI components
│   ├── AIAvatar.tsx
│   ├── BrandAnimation.tsx
│   ├── BrandCarousel.tsx
│   ├── BrandHeroVisual.tsx
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Hook.tsx
│   ├── Logo.tsx
│   ├── Navbar.tsx
│   └── Services.tsx
├── pages/            # Page components
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── Home.tsx
│   └── ServicesPage.tsx
├── App.tsx           # Root component
├── index.tsx         # Entry point
└── index.html        # HTML template
```

## License

All rights reserved.
