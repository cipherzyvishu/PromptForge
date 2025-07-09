# 📦 Project Artifact: PromptForge (Free AI Prompt Marketplace & Playground)

---

## 🌟 Project Overview

**Name:** PromptForge\
**Goal:** Build a stunning, fully free AI prompt platform to explore, test, build, and share AI prompts — with zero monthly cost.

**Core Idea:** Think "Canva for AI Prompts" — users can discover high-quality prompts, try them live, create prompt templates with variables, and share them.

---

## 🔧 Free Tech Stack Plan

| Layer       | Tool                 | Why                           |
| ----------- | -------------------- | ----------------------------- |
| Frontend    | Next.js (App Router) | Full-featured, fast, scalable |
| Styling     | Tailwind CSS v4      | Utility-first, clean CSS      |
| Components  | Shadcn UI            | Prebuilt UI components        |
| Icons       | Lucide Icons         | Open source icons             |
| Animations  | Framer Motion        | Smooth, performant animations |
| DB + Auth   | Supabase             | Free tier, fast setup         |
| Hosting     | Vercel               | Free personal hosting         |
| AI Response | Ollama / Mock Data   | Free local LLM or dummy data  |

---

## 📅 7-Day Build Plan (Week 1 MVP)

| Day   | Focus                    | Tasks                                                  |
| ----- | ------------------------ | ------------------------------------------------------ |
| Day 1 | Setup & Folder Structure | Next.js, Tailwind, Shadcn, Vercel setup                |
| Day 2 | Hero Section             | Animated heading, subtitle, CTA                        |
| Day 3 | PromptCard Component     | Build responsive card layout from mock data            |
| Day 4 | Playground Page          | Build form to input prompt variables, show mock output |
| Day 5 | Prompt Builder           | UI to create new prompt templates with variables       |
| Day 6 | Theme Toggle & Cmd+K     | Dark/light mode and command palette                    |
| Day 7 | Polish & Deploy          | Responsive tweaks, deploy to Vercel                    |

---

## 🧱 Folder Structure

```
/app
  /explore          # Prompt Gallery
  /builder          # Prompt Builder
  /playground       # Prompt Test Page
  layout.tsx        # Shared Layout
  page.tsx          # Landing Page
/components
  Hero.tsx
  PromptCard.tsx
  PlaygroundForm.tsx
  CommandPalette.tsx
  ThemeToggle.tsx
/lib
  prompts.ts        # Mock Prompt Data
  utils.ts
/styles
  globals.css
```

---

## 🖼️ UI Layout Guidance

### Hero Page

```
👋 HEADLINE
"Explore, Build & Launch AI Prompts — Beautifully."

🪄 SUBTEXT
"Browse tested prompts. Try them live. No guesswork."

🚀 [ Browse Prompts ] [ Try Playground ]
```

### Explore Page

```
🔍 Search
📦 Prompt Cards
🧹 Title, tags, Try button
Grid layout (responsive)
```

### Playground Page

```
📝 Prompt Template
🎛 Input Form (tone, topic, audience)
🧠 Run Prompt → Output appears
```

### Prompt Builder

```
Drag/drop variables
Preview prompt in real-time
[ Save Prompt ]
```

### Other Components

- 🌙 Theme Toggle: dark/light switch
- ⌘ Cmd + K: search & navigate prompts quickly

---

## 📈 Page Flow Wireframe (Phase 1)

```
🔽 Landing Page (`/`)
- Hero section
- Browse Prompts → /explore
- Try Playground → /playground

🔽 Explore Page (`/explore`)
- PromptCard grid from JSON
- Search + Filter
- Try Prompt → opens Playground

🔽 Playground Page (`/playground`)
- Show prompt template
- Input form (tone, topic, etc.)
- Run prompt → output (mock or local LLM)

🔽 Builder Page (`/builder`)
- UI to add variables to prompt
- Preview rendered prompt
- Save prompt (local or Supabase)

Global Features:
- 🌙 Theme toggle on top right
- ⌘ Cmd + K palette for quick nav
```

---

## 💸 Cost Summary (All Free)

| Area    | Tool                     | Cost |
| ------- | ------------------------ | ---- |
| Hosting | Vercel                   | ₹0   |
| UI      | Tailwind + Shadcn        | ₹0   |
| DB      | Supabase (free tier)     | ₹0   |
| LLM     | Local (Ollama) or mocked | ₹0   |
| Domain  | Optional                 | ₹0   |

> ✅ **Total Monthly Cost: ₹0**

---

## ✅ Project Goals Summary

- ✨ Beautiful, modern UI (Vercel / Framer style)
- 🧪 Live prompt testing experience
- 🧠 Prompt creation & customization
- ♻️ Fully reusable & shareable prompts
- 🧳️ Entirely free to build and deploy

---

## 👣 Next Step

**Start Day 1** → Setup the project + build Hero layout with animation.

When ready:\
👉 Say: "Done with setup, give me Day 2"

