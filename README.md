# 🎂 Birthday Website Builder & Celebration Platform

A premium, full-stack Next.js 15+ application that allows users and admins to build personalized birthday celebration websites with interactive features, customizable visual themes, music, milestone timelines, memory photo galleries, and visitor wish walls.

---

## 🌟 Key Features

### 1. **Public Birthday Celebration Page (`/birthday/[slug]`)**
- **Dynamic SEO Metadata**: Dynamic page titles, meta descriptions, and OpenGraph/Twitter cards generated via `generateMetadata()`.
- **Full-Screen Hero**: Glowing photo avatar framed with animated badge overlay, headline, and action CTAs.
- **Real-Time Countdown Timer**: Live target date countdown timer with celebratory confetti explosions.
- **Interactive Celebration Cake**: 3D-styled SVG birthday cake with flickering flames. Clicking "Make a Wish" blows out flames, pops confetti, and reveals wish notes!
- **Interactive Surprise Gift Box**: Unboxable gift box with animated lid bounce that reveals secret personal messages.
- **Memories Gallery Vault**: Responsive 1-to-4 column photo grid with hover zoom overlays and lightbox viewer.
- **Milestone Life Timeline**: Scroll-animated vertical timeline detailing story milestones year by year.
- **Visitor Wish Wall & Submission Form**: Public visitors can submit birthday wishes validated by Zod schemas, with heart reaction counts.
- **Floating Ambient Music Player**: Ambient audio player widget with play/pause, title display, and equalizer bars.
- **Floating CSS Balloons & Celebration Effects**: Lightweight floating balloons and performance-optimized canvas confetti bursts.

### 2. **Dashboard & Website Builder (`/dashboard`)**
- **Overview Analytics**: Real-time stats cards tracking total celebrations, published status, total memories, and visitor wishes.
- **Celebration Management**: Grid view of all birthdays with instant preview, edit, copy public link, publish/unpublish toggle, and deletion.
- **Create Birthday Flow (`/dashboard/birthdays/new`)**: Step-by-step form for initializing a celebration microsite.
- **Tabbed Editor (`/dashboard/birthdays/[id]/edit`)**:
  - **GENERAL**: Name, date, profile image, headline, description, personal note, publish toggle.
  - **MEMORIES**: Add, edit, delete, and reorder photo items.
  - **TIMELINE**: Add, edit, delete milestone events.
  - **WISHES**: Moderate visitor wishes (approve/hide/delete).
  - **THEME**: Select 7 preset visual themes (*Royal Purple, Romantic Pink, Midnight Blue, Elegant Gold, Sunset, Luxury Black, Soft Lavender*) or customize hex color pickers and typography.
  - **MUSIC**: Configure MP3 audio URL, track title, and test playback.
  - **SETTINGS**: View public share URL, copy link, and delete options.
- **Live Side-by-Side Split Preview**: Real-time desktop preview panel updating immediately as content is edited.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 15+ (App Router, Server & Client Components, Dynamic Metadata)
- **Language**: TypeScript (Strict mode, full type-safety)
- **Styling**: Tailwind CSS v4, Vanilla CSS keyframes, Glassmorphism utilities
- **Animations**: Framer Motion, Canvas Confetti
- **Icons**: Lucide React
- **Database & ORM**: Neon PostgreSQL with Prisma ORM
- **Validation**: Zod input validation schemas
- **Storage Strategy**: PostgreSQL URL string storage (ready for Cloudinary, UploadThing, or S3 bucket integration)

---

## 🚀 Getting Started

### 1. **Install Dependencies**

```bash
npm install
```

### 2. **Environment Configuration**

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set your connection string in `.env`:

```env
DATABASE_URL="postgresql://neondb_owner:YOUR_PASS@ep-xyz.aws.neon.tech/neondb?sslmode=require"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
AUTH_SECRET="your-super-secret-key"
```

### 3. **Prisma Database Initialization**

Generate Prisma Client:

```bash
npx prisma generate
```

Run dev migration to initialize PostgreSQL schema:

```bash
npx prisma migrate dev --name init
```

Seed initial demo user & birthday celebration data for **Priya** (`/birthday/priya-2026`):

```bash
npx prisma db seed
```

Open Prisma Studio to manage database records interactively:

```bash
npx prisma studio
```

### 4. **Run Development Server**

```bash
npm run dev
```

Visit:
- Home Landing Page: [http://localhost:3000](http://localhost:3000)
- Demo Birthday Page: [http://localhost:3000/birthday/priya-2026](http://localhost:3000/birthday/priya-2026)
- Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

---

## 🐘 Neon PostgreSQL Setup

1. Sign in to [Neon Tech](https://neon.tech/) and create a new project.
2. Create a PostgreSQL database instance.
3. Copy the pooled connection string (with `?sslmode=require`).
4. Paste the connection string as `DATABASE_URL` in `.env`.
5. Run `npx prisma migrate deploy` in production or `npx prisma migrate dev --name init` during local setup.

---

## ☁️ Deployment to Vercel

1. Push code repository to GitHub.
2. Import project in **Vercel**.
3. Add Environment Variables in **Vercel Settings → Environment Variables**:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_APP_URL`
   - `AUTH_SECRET`
4. Deploy! Vercel automatically runs `npm run build` and `prisma generate`.

---

## 📡 API Reference

- `GET /api/birthdays` - Get user birthdays list
- `POST /api/birthdays` - Create new birthday celebration (Zod validated, unique slug generated)
- `GET /api/birthdays/[id]` - Get birthday details
- `PUT /api/birthdays/[id]` - Update general info
- `DELETE /api/birthdays/[id]` - Delete celebration
- `GET /api/birthdays/[id]/memories` & `POST /api/birthdays/[id]/memories` - Manage memories
- `PUT /api/memories/[id]` & `DELETE /api/memories/[id]` - Edit/delete memory
- `GET /api/birthdays/[id]/timeline` & `POST /api/birthdays/[id]/timeline` - Manage timeline
- `PUT /api/timeline/[id]` & `DELETE /api/timeline/[id]` - Edit/delete timeline item
- `POST /api/birthdays/[id]/wishes` - Submit visitor wish (Zod validated)
- `PUT /api/wishes/[id]` & `DELETE /api/wishes/[id]` - Moderate wish approval/deletion
- `GET /api/birthdays/[id]/theme` & `PUT /api/birthdays/[id]/theme` - Theme settings
- `GET /api/birthdays/[id]/music` & `POST /api/birthdays/[id]/music` - Music track configuration
