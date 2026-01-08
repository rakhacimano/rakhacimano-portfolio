# Rakha Putra Pratama // Senior UI/UX Designer
### Digital Neo-Brutalism & Functional Minimalism

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

---

## ✦ Project Overview

This is the **Portfolio V2** for **Rakha Putra Pratama**. A high-performance, aesthetically rigorous personal website designed to showcase senior-level UI/UX work. 

The design philosophy adheres to **Neo-Brutalism**: raw, structural, and unadorned, utilizing a strict color palette of **Primary Red (`#FF6161`)** and **Deep Black (`#0D0D0D`)**. It rejects the soft, rounded trends of modern web design in favor of sharp lines, high contrast, and weighted physics.

## ✦ Key Features

- **Inverted Parallax Hero**: A custom mouse-reactive hero section with depth separation and 3D tilt.
- **Glassmorphism Navigation**: Adaptive navbar that blurs content on scroll.
- **Interactive Project Grid**: Hotlinked Unsplash integration with duotone hover effects.
- **Custom Cursor**: A delayed-spring physics cursor with accent dot and trailing ring.
- **Sticky Scroll Experience**: "Core Pillars" section utilizing sticky positioning for narrative flow.
- **Optimized Performance**: Built on Next.js 14+ (App Router) with Lenis for smooth scrolling.

## ✦ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion & GSAP |
| **Icons** | Iconsax & Inline SVGs |
| **Smooth Scroll** | Lenis |
| **Assets** | Unsplash Source (Hotlinked) |

## ✦ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/my-portfolio-website.git
cd my-portfolio-website
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ✦ Project Structure

```bash
├── app/                  # App Router Pages & Layouts
│   ├── globals.css       # Global Styles & Tailwind Theme
│   ├── layout.tsx        # Root Layout with Font Config
│   └── page.tsx          # Home Page Composition
├── components/           # Reusable UI Components
│   ├── Cursor.tsx        # Custom Mouse Interaction
│   ├── Hero.tsx          # Parallax Hero Section
│   ├── Navbar.tsx        # Navigation Bar
│   ├── ProjectGrid.tsx   # Portfolio Showcase
│   └── ...
├── public/               # Static Assets
└── lib/                  # Utilities
```

## ✦ Design System

- **Fonts**: `Onest` (Primary Sans), `Instrument Serif` (Accent/Italic)
- **Colors**:
  - Primary: `#FF6161`
  - Dark: `#0D0D0D`
  - Light: `#FFFFFF`
- **Cursor**: `none` (Custom implementation)

---

*Designed & Developed by Rakha Putra Pratama. © 2024.*
