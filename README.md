# Nhlakanipho Luthuli Portfolio Final

A personal portfolio website that showcases my profile, technical skills, project work, certificates, badges, and contact details.

This project is built as a modern Vue 3 single-page application (SPA) with Vite and Vue Router, and it presents all sections through clean route-based pages.

## Project Overview

The portfolio was created to:

- Present my professional profile and developer journey
- Highlight completed and ongoing technical projects
- Share verified certificates and badges
- Provide an easy contact channel through a live form

The website focuses on responsive design, clear content hierarchy, and a consistent personal brand style.

## Main Sections

The application includes the following pages:

- Home: Hero introduction, skill categories, and learning journey table
- About: Personal background, goals, and downloadable CV
- Projects: Featured project cards with live demo links
- Certificates: Certificate gallery in card format
- Badges: Achievement badges with external verification links
- Contact: Contact form powered by Formspree

## Tech Stack

- Vue 3
- Vue Router 4
- Vite 6
- JavaScript (ES Modules)
- HTML5 + CSS3

## Key Features

- Route-based navigation using Vue Router
- Dynamic page titles per route for better UX and SEO basics
- Reusable card grid component for projects, certificates, and badges
- Responsive layout for desktop, tablet, and mobile screens
- Sticky header navigation with clear section access
- Contact form submission via Formspree endpoint

## Project Structure

```
Nhlakanipho-Luthuli---Portfolio-Final/
|- src/
|  |- main.js                 # App entry point, router setup, route titles
|  |- App.vue                 # Global header, navigation, footer, RouterView
|  |- components/
|  |  |- CardGrid.vue         # Reusable card rendering component
|  |- views/
|     |- HomeView.vue
|     |- AboutView.vue
|     |- ProjectsView.vue
|     |- CertificatesView.vue
|     |- BadgesView.vue
|     |- ContactView.vue
|- css/
|  |- style.css               # Global styling, layout, responsiveness
|- public/
|  |- images/                 # Public static assets
|- images/                    # Source image assets used in content
|- package.json               # Scripts and dependency definitions
|- vite.config.js             # Vite configuration
```

## Setup and Run

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## NPM Scripts

- `npm run dev`: Start local development server
- `npm run build`: Create optimized production build
- `npm run preview`: Preview built production output locally

## Routing Map

- `/` -> HomeView
- `/about` -> AboutView
- `/projects` -> ProjectsView
- `/certificates` -> CertificatesView
- `/badges` -> BadgesView
- `/contact` -> ContactView

## Design and UX Notes

- Dark-themed interface with high-contrast accent color
- Rounded cards and buttons for consistent visual language
- Subtle animations and hover interactions to improve engagement
- Flexible grid layouts for content-heavy sections

## Current Status

Completed core portfolio sections with working navigation, responsive styles, media content, and contact form integration.

## Future Improvements

- Add project filtering and category tags
- Add form success/error state feedback in UI
- Optimize image assets for faster loading
- Add unit/component tests for core Vue components
- Add accessibility audits and semantic improvements

## Author

Nhlakanipho Luthuli

- GitHub: https://github.com/Nhlakanipho2108
- LinkedIn: https://www.linkedin.com/in/nhlakanipho-luthuli-87b30a366/
