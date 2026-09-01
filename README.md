# Kunal Kumbhar - Portfolio

[![Deploy Status](https://github.com/YOUR-USERNAME/portfolio-kunal/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR-USERNAME/portfolio-kunal/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Award-level fast, modern portfolio built with React, TypeScript, and Tailwind CSS**

🌐 **Live:** [kunalkumbhar.com](https://kunalkumbhar.com)

---

## ✨ Features

### Performance Optimizations
- ⚡ **68% Smaller Bundle** - Lazy loading + code splitting
- 🚀 **Sub-2s Load Time** - Optimized for Lighthouse 90+ score
- 📦 **Smart Chunking** - Separate vendor bundles for better caching
- 🖼️ **Lazy Images** - Deferred loading with async decoding
- 💨 **Gzip Compression** - Fast content delivery

### UI/UX Features
- 🎨 **Modern Design** - Glassmorphism, gradients, smooth animations
- 🌓 **Dark Mode** - Seamless theme switching
- 📱 **Fully Responsive** - Mobile-first design
- 🖱️ **Custom Cursor** - Interactive dot + ring cursor
- 🎭 **Smooth Scrolling** - Lenis smooth scroll
- ✨ **Framer Motion** - Buttery smooth animations

### Sections
- 👋 Hero with typewriter effect
- 🛠️ Skills marquee with 20+ technologies
- 💼 Featured projects with 3D tilt cards
- 📈 Experience timeline
- 🎓 Certifications
- 📊 GitHub contribution graph
- 📧 Contact form with floating labels
- 🔗 Social links

---

## 🛠️ Tech Stack

### Core
- **React** 19.2.0 - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling

### Libraries
- **Framer Motion** - Animations
- **Lenis** - Smooth scrolling
- **GSAP** - Advanced animations
- **React Fast Marquee** - Skills carousel
- **React GitHub Calendar** - Contribution graph

### Deployment
- **Docker** - Containerization
- **Nginx** - Web server
- **GitHub Actions** - CI/CD
- **Cloudflare** - CDN + SSL

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/portfolio-kunal.git
cd portfolio-kunal

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

---

## 📦 Project Structure

```
portfolio-kunal/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── nginx/
│   └── nginx.conf              # Nginx configuration
├── public/
│   ├── favicon.svg
│   ├── profile.jpeg
│   └── logos/                  # Skill icons
├── src/
│   ├── components/
│   │   ├── CustomCursor.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── SkillsMarquee.tsx
│   │   ├── Projects/
│   │   │   └── ProjectCard.tsx
│   │   ├── Experience.tsx
│   │   ├── Certifications.tsx
│   │   ├── GitHubGraph.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   └── PageLoader.tsx      # Liquid fill loader
│   ├── context/
│   │   ├── ThemeContext.tsx
│   │   └── LenisContext.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── App.tsx                 # Main app with lazy loading
│   ├── main.tsx
│   └── index.css
├── Dockerfile                   # Multi-stage build
├── docker-compose.yml
├── .dockerignore
├── vite.config.ts              # Build optimization
├── tailwind.config.js
└── package.json
```

---

## 🌐 Deployment

This portfolio uses **automated deployment** via GitHub Actions.

### Deployment Flow
```
Push to main → GitHub Actions → VPS (Docker) → Nginx → Cloudflare → HTTPS
```

### Prerequisites
1. VPS with Docker installed
2. Domain pointing to Cloudflare
3. GitHub repository secrets configured

### GitHub Secrets Required
Add these in `Settings → Secrets → Actions`:

| Secret | Description |
|--------|-------------|
| `VPS_HOST` | VPS IP address |
| `VPS_USERNAME` | SSH username |
| `VPS_SSH_KEY` | Private SSH key |
| `VPS_PORT` | SSH port (22) |

### Deploy
```bash
git add .
git commit -m "Update portfolio"
git push origin main
# Auto-deploys via GitHub Actions! 🎉
```

📖 **Full Deployment Guide:** See [implementation_plan.md](docs/implementation_plan.md)

---

## 📊 Performance Metrics

### Bundle Size
| Metric | Size (gzipped) |
|--------|----------------|
| Main Bundle | 63.47 KB |
| Animation Vendor | 45.65 KB |
| UI Vendor | 12.73 KB |
| React Vendor | 4.07 KB |
| CSS | 6.62 KB |
| **Total Initial** | **~157 KB** |

### Lighthouse Score (Target)
- ⚡ Performance: **90+**
- ♿ Accessibility: **95+**
- 🔍 SEO: **100**
- ⚙️ Best Practices: **95+**

### Load Times (Target)
- First Contentful Paint: **<1s**
- Largest Contentful Paint: **<1.6s**
- Time to Interactive: **<2.2s**

---

## 🎨 Customization

### Colors
Edit `src/index.css`:
```css
:root {
  --color-primary: #0BAF97;
  --color-accent: #00B7FF;
}
```

### Content
- **Projects:** `src/components/Projects.tsx`
- **Experience:** `src/components/Experience.tsx`
- **Skills:** `src/components/SkillsMarquee.tsx`
- **Contact:** `src/components/ContactForm.tsx`

### Theme
Toggle between light/dark mode using the theme switcher in the navbar

---

## 🔧 Scripts

```bash
# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint

# Docker (Local Testing)
docker-compose build  # Build image
docker-compose up     # Start container
docker-compose down   # Stop container
```

---

## 📝 License

MIT © [Kunal Kumbhar](https://github.com/kumbharkunal)

---

## 🤝 Connect

- 🌐 Website: [kunalkumbhar.com](https://kunalkumbhar.com)
- 💼 LinkedIn: [linkedin.com/in/kunalkumbhar](https://linkedin.com/in/kunalkumbhar)
- 🐱 GitHub: [@kumbharkunal](https://github.com/kumbharkunal)
- 📧 Email: [your.email@example.com](mailto:your.email@example.com)

---

Made with ❤️ using React + TypeScript + Tailwind CSS
