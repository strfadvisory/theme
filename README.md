# SurveyJS Theme Showcase

A premium theme marketplace for [SurveyJS](https://surveyjs.io/) — browse, search, and instantly preview 20 professionally designed themes, then apply one to restyle the entire app and a live survey in real time.

## Features

- **20 curated themes** spanning Light, Dark, Modern, Professional, Creative, and Minimal categories — each with a full color/typography/radius/shadow token set.
- **Live whole-app theming** — applying a theme instantly restyles the background, header, sidebar, cards, buttons, and the SurveyJS preview via CSS custom properties, with smooth transitions and no reload.
- **Live survey preview** — a real SurveyJS form (`survey-core` + `survey-react-ui`) re-skinned with each theme's tokens.
- **Search & filters** — instant search by name/category, plus category chips (All, Light, Dark, Modern, Professional, Creative, Minimal).
- **Favorites** — star themes and filter to favorites only, persisted to `localStorage`.
- **Theme preview modal** — inspect a theme (palette, description, live survey) before applying it.
- **Export theme** — download any theme's full token set as a JSON file.
- **Accessible & responsive** — keyboard navigation, focus states, ARIA labels, skip-to-content link, and a 1/2/4-column responsive gallery grid.
- **Animated** — Framer Motion powers card, filter, and modal transitions, and respects `prefers-reduced-motion`.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router) + TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-based `@theme inline` configuration)
- [SurveyJS](https://surveyjs.io/) (`survey-core`, `survey-react-ui`)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Zustand](https://github.com/pmndrs/zustand) with `persist` for state + `localStorage`
- [Lucide](https://lucide.dev/) icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the development server          |
| `npm run build` | Create an optimized production build  |
| `npm run start` | Run the production build locally      |
| `npm run lint`  | Run ESLint                            |

## Project Structure

```
src/
├── app/                 # App Router entry (layout, page, global styles)
├── components/
│   ├── layout/          # Header, Sidebar, Footer
│   ├── themes/          # Gallery, cards, filters, preview modal
│   ├── survey/          # SurveyJS preview + loading skeleton
│   ├── ui/               # Reusable primitives (Button, Card, Modal, ...)
│   └── shared/          # ThemeProvider, HeroSection, GalleryView
├── constants/           # Site config + sample survey JSON
├── data/                # The 20-theme dataset
├── hooks/               # useFilteredThemes, useSelectedTheme
├── lib/                 # Color utilities, theme application, SurveyJS theme mapping
├── store/               # Zustand store (selection, favorites, filters)
└── types/               # Theme + survey JSON types
```

## How Theming Works

1. Each theme is a `ThemeConfig` (see `src/types/theme.ts`) — a flat set of design tokens: background, surface, primary/secondary/accent colors, text colors, border, shadow color, and corner radius.
2. `applyThemeToDocument` (`src/lib/apply-theme.ts`) derives a full set of `--app-*` CSS custom properties from the active theme and writes them to `:root`.
3. `globals.css` maps those `--app-*` variables into Tailwind v4 design tokens via `@theme inline`, so utility classes like `bg-surface`, `text-foreground`, and `border-border` automatically reflect the active theme.
4. `createSurveyTheme` (`src/lib/survey-theme.ts`) maps the same tokens onto a SurveyJS `ITheme`, applied to the survey model so the live preview matches the gallery instantly.

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com/):

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the project into Vercel — the default Next.js build settings (`next build`) work out of the box.
3. No environment variables are required.

Or deploy directly from the CLI:

```bash
npx vercel
```
