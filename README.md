# Jovan Sebastian William — Portfolio Website

> A high-performance, immersive developer portfolio engineered with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**, featuring an atmospheric **Glacial Ice & Cave Cyber-Monolith** aesthetic, 3D spatial tilt physics, multi-engine canvas particle systems, and an enterprise-grade secure contact ecosystem.

---

## ⚡ Key Highlights & Features

### 🧊 1. Glacial Ice & Cave Cyber-Monolith Aesthetic
- **3D Frosted Glass Monoliths**: Custom dark glassmorphism system with multi-layer outer bevels, reactive cursor-following hairline spotlights, specular cyan/platinum rim glints, and hardware corner rivets.
- **Interactive 3D Spatial Photo**: Physics-driven portrait card featuring spring-damped 3D rotation, cursor parallax depth, studio lighting contrast, and crystalline fractured ice reflections (`InteractiveTiltCard`).
- **Responsive Symmetrical Bento Grid**: Carefully tailored for all viewports—featuring symmetrical side-by-side bento cards, compact 2×2 engineering pillar layouts on mobile, and responsive aspect ratios that never stretch or distort.

### 🌌 2. Triple-Engine HTML5 Canvas Particles
- **3D Glacial Ice Fog Mist (`IceMistCanvas`)**: Scroll-reactive mist particles with depth-scaled velocity and organic horizontal drift, simulating cold glacial air as users navigate the page.
- **Ambient Cave Fireflies (`CaveFireflyCanvas`)**: Soft glowing particles with sinusoidal trajectories and harmonic flicker frequencies, paused automatically when offscreen via `IntersectionObserver` to preserve battery and GPU cycles.
- **Hero Rock Debris (`CaveDebrisCanvas`)**: Interactive floating subterranean rock particles reacting dynamically to cursor velocity and mouse proximity with elastic return physics.

### 🛡️ 3. Advanced Contact System & Multi-Layered Security
A full-stack communication suite powered by **Next.js Server Actions** and **Resend**, architected with comprehensive defensive programming:
- **Zero-Expose Server Actions**: Dispatches transactional emails entirely server-side (`sendContactEmail`), safeguarding API keys and server secrets.
- **Dual-Layer Anti-Bot Protection**:
  - *Honeypot Traps*: Multiple invisible decoy fields (`hp_website`, `company_fax`) hidden via CSS and `aria-hidden` that trap automated spam bots silently.
  - *Submission Timing Analysis*: Rejects requests completed faster than 3 seconds, filtering out instant automated HTTP bots while remaining seamless for genuine human visitors.
- **Threat Inspection & Content Sanitization**:
  - Complete HTML entity escaping against Cross-Site Scripting (XSS) and injection attacks.
  - Threat scanner blocking dangerous executable file extensions, forbidden URI schemes (`javascript:`, `data:`), and script tags.
  - Advanced spam and phishing heuristics detecting link flooding, promotional spam patterns, and Cyrillic link bursts.
  - Strict CRLF and control character sanitization preventing email header injection.
- **Sliding-Window IP Rate Limiter**:
  - In-memory rate limiting capped at 4 messages per 10-minute window per IP.
  - Self-cleaning memory pool auto-purging expired entries to eliminate memory leak risks.
  - GDPR-friendly IP anonymization masking client octets before storage or logging.
- **Dual-Dispatch Automation**:
  - *Admin Alert*: Sends a rich, structured HTML notification containing the sender's details, inquiry message, and security metadata.
  - *Instant Auto-Responder*: Dispatches an automated, elegantly branded confirmation email back to the sender acknowledging receipt.
- **Live Widgets & Channels**:
  - One-click copy email button with real-time clipboard feedback and quick mailto launcher.
  - Live real-time Asia/Jakarta (WIB / UTC+7) digital clock with availability status.
  - Dedicated bento cards for GitHub and LinkedIn networks.

### 💼 4. Interactive Project Ecosystem
- **Interactive 3D Card Stack**: Dynamic visual card stack with category filtering, technology stack tags, live preview launchers, and deep-dive detail pages (`/projects/[slug]`).
- **Media Gallery & System Architecture**: In-depth breakdowns of system architecture, security considerations, and engineering decisions for featured projects.

### 🌐 5. Runtime Internationalization (i18n)
- **Instant Language Switching**: Runtime toggle between **Bahasa Indonesia** and **English** powered by React Context (`LanguageContext`), delivering a seamless experience for global and local viewers with zero page reloads.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode, 100% Type-Safe) |
| **Styling & Design** | [Tailwind CSS v4](https://tailwindcss.com/) (Modern CSS variables, 3D Utilities) |
| **Animations & 3D** | [Framer Motion](https://www.framer.com/motion/) (Spring physics, Staggered Pop-Ins) |
| **Graphics Engine** | HTML5 Canvas (Offscreen render caching, `IntersectionObserver` lifecycle) |
| **Email Service** | [Resend](https://resend.com/) (Server Actions, Transactional Emails) |
| **Icons & Typography** | [Lucide React](https://lucide.dev/), Geist Sans, Geist Mono, Newsreader |

---

## 📁 Project Architecture

```
web_porto/
├── public/                     # Static media assets, portraits, and icons
├── src/
│   ├── app/
│   │   ├── actions/
│   │   │   └── send-email.ts   # Server action: email dispatch, rate-limiting, security & templates
│   │   ├── projects/[slug]/    # Dynamic detailed project pages
│   │   ├── globals.css         # Tailwind CSS v4 design tokens, 3D glass & cyber utilities
│   │   ├── layout.tsx          # Root layout with fonts, metadata, and background scenes
│   │   ├── page.tsx            # Single-page portfolio composition
│   │   ├── robots.ts           # Dynamic robots.txt generation
│   │   ├── sitemap.ts          # Dynamic XML sitemap generator
│   │   ├── manifest.ts         # Progressive Web App (PWA) manifest
│   │   └── opengraph-image.tsx # Dynamic social sharing Open Graph banner (1200x630)
│   ├── components/
│   │   ├── 3d/                 # Background canvas orchestrator & preloader
│   │   ├── layout/             # Navigation bar and responsive footer
│   │   ├── projects/           # Project gallery and detail content components
│   │   ├── sections/           # Hero, About, Project, and Contact sections
│   │   ├── seo/
│   │   │   └── JsonLd.tsx      # Schema.org JSON-LD Person, WebSite & ProfilePage structured data
│   │   └── ui/                 # 3D canvas, bento, and interactive primitives
│   ├── context/
│   │   └── LanguageContext.tsx # Runtime language toggle state (ID / EN)
│   ├── data/
│   │   ├── projects.ts         # Portfolio project dataset & metrics
│   │   ├── seo-keywords.ts     # Master SEO keywords, identity & site configuration
│   │   └── translations.ts     # Dual-language bilingual dictionaries
│   └── types/                  # TypeScript interface definitions
├── SEO_KEYWORDS.md             # Complete SEO keywords matrix & Google ranking guide
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18.18+** (or Node.js 20+) installed on your machine.

### 2. Clone the Repository
```bash
git clone https://github.com/Jovan-SW/web_portofolio.git
cd web_portofolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# Resend API Key for contact form transactional emails
RESEND_API_KEY=re_your_api_key_here

# Recipient email address for contact form notifications
CONTACT_EMAIL_RECIPIENT=jovsebwil723@gmail.com
```

> **Note:** If `RESEND_API_KEY` is omitted, the contact form will operate in development fallback mode, outputting log statements while alerting the user in development.

### 5. Start the Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to experience the website.

### 6. Build for Production
```bash
npm run build
npm run start
```

---

## 📬 Contact & Connect

- **Portfolio**: [https://jovansw.is-a.dev](https://jovansw.is-a.dev)
- **GitHub**: [@Jovan-SW](https://github.com/Jovan-SW)
- **LinkedIn**: [Jovan Sebastian](https://www.linkedin.com/in/jovansebastian)
- **Email**: [jovsebwil723@gmail.com](mailto:jovsebwil723@gmail.com)

---

*Crafted with precision, high-performance standards, and engineering rigor by **Jovan Sebastian William**.*
