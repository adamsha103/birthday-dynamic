import { neon } from '@neondatabase/serverless'

const connectionString =
  'postgresql://neondb_owner:npg_6YDM9AnwqSXk@ep-frosty-boat-azhehutt-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

async function migrateAndSeed() {
  console.log('🌱 Connecting to Neon PostgreSQL via HTTP endpoint...')
  const sql = neon(connectionString)

  console.log('⚡ Ensuring tables exist in Neon PostgreSQL...')

  await sql`
    CREATE TABLE IF NOT EXISTS "User" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "passwordHash" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "User_pkey" PRIMARY KEY ("id")
    );
  `

  await sql`CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");`

  await sql`
    CREATE TABLE IF NOT EXISTS "Birthday" (
        "id" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "birthdayDate" TIMESTAMP(3) NOT NULL,
        "profileImage" TEXT NOT NULL,
        "headline" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "personalMessage" TEXT NOT NULL,
        "isPublished" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Birthday_pkey" PRIMARY KEY ("id")
    );
  `

  await sql`CREATE UNIQUE INDEX IF NOT EXISTS "Birthday_slug_key" ON "Birthday"("slug");`
  await sql`CREATE INDEX IF NOT EXISTS "Birthday_userId_idx" ON "Birthday"("userId");`

  await sql`
    CREATE TABLE IF NOT EXISTS "Memory" (
        "id" TEXT NOT NULL,
        "birthdayId" TEXT NOT NULL,
        "imageUrl" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "displayOrder" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Memory_pkey" PRIMARY KEY ("id")
    );
  `
  await sql`CREATE INDEX IF NOT EXISTS "Memory_birthdayId_idx" ON "Memory"("birthdayId");`

  await sql`
    CREATE TABLE IF NOT EXISTS "TimelineEvent" (
        "id" TEXT NOT NULL,
        "birthdayId" TEXT NOT NULL,
        "year" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "imageUrl" TEXT,
        "displayOrder" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "TimelineEvent_pkey" PRIMARY KEY ("id")
    );
  `
  await sql`CREATE INDEX IF NOT EXISTS "TimelineEvent_birthdayId_idx" ON "TimelineEvent"("birthdayId");`

  await sql`
    CREATE TABLE IF NOT EXISTS "BirthdayWish" (
        "id" TEXT NOT NULL,
        "birthdayId" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "message" TEXT NOT NULL,
        "isApproved" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "BirthdayWish_pkey" PRIMARY KEY ("id")
    );
  `
  await sql`CREATE INDEX IF NOT EXISTS "BirthdayWish_birthdayId_idx" ON "BirthdayWish"("birthdayId");`

  await sql`
    CREATE TABLE IF NOT EXISTS "BirthdayTheme" (
        "id" TEXT NOT NULL,
        "birthdayId" TEXT NOT NULL,
        "presetName" TEXT NOT NULL DEFAULT 'Romantic Pink',
        "primaryColor" TEXT NOT NULL DEFAULT '#EC4899',
        "secondaryColor" TEXT NOT NULL DEFAULT '#F43F5E',
        "accentColor" TEXT NOT NULL DEFAULT '#FBBF24',
        "backgroundColor" TEXT NOT NULL DEFAULT '#180816',
        "fontStyle" TEXT NOT NULL DEFAULT 'sans',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "BirthdayTheme_pkey" PRIMARY KEY ("id")
    );
  `
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS "BirthdayTheme_birthdayId_key" ON "BirthdayTheme"("birthdayId");`

  await sql`
    CREATE TABLE IF NOT EXISTS "Music" (
        "id" TEXT NOT NULL,
        "birthdayId" TEXT NOT NULL,
        "title" TEXT NOT NULL,
        "audioUrl" TEXT NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
    );
  `
  await sql`CREATE INDEX IF NOT EXISTS "Music_birthdayId_idx" ON "Music"("birthdayId");`

  console.log('🌱 Inserting demo records into Neon PostgreSQL...')

  // Delete existing demo records
  await sql`DELETE FROM "User" WHERE email = 'admin@birthdaycelebration.com'`

  // 1. Insert User
  await sql`
    INSERT INTO "User" (id, name, email, "passwordHash", "createdAt", "updatedAt")
    VALUES ('demo-user-id', 'Celebration Admin', 'admin@birthdaycelebration.com', '$2a$10$e8w3Xj0y.samplePasswordHashKeyForDevDemo', NOW(), NOW())
  `

  // 2. Insert Birthday for Priya
  const bdayId = 'priya-demo-id'
  await sql`
    INSERT INTO "Birthday" (id, "userId", name, slug, "birthdayDate", "profileImage", headline, description, "personalMessage", "isPublished", "createdAt", "updatedAt")
    VALUES (
      ${bdayId},
      'demo-user-id',
      'Priya',
      'priya-2026',
      '2026-10-15T00:00:00Z',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      '✨ A Special Day For An Extraordinary Soul ✨',
      'Welcome to Priya’s 2026 Birthday Celebration! Explore cherished memories, milestone stories, blow out the virtual candles, send your wishes, and celebrate with love!',
      'Dear Priya, your smile brightens up the world around you and your warmth inspires everyone. May this year bring you boundless happiness, thrilling adventures, and true magic in every moment!',
      true,
      NOW(),
      NOW()
    )
  `

  // 3. Insert Theme
  await sql`
    INSERT INTO "BirthdayTheme" (id, "birthdayId", "presetName", "primaryColor", "secondaryColor", "accentColor", "backgroundColor", "fontStyle", "createdAt", "updatedAt")
    VALUES ('theme-priya', ${bdayId}, 'Romantic Pink', '#EC4899', '#F43F5E', '#FBBF24', '#180816', 'sans', NOW(), NOW())
  `

  // 4. Insert Music Track
  await sql`
    INSERT INTO "Music" (id, "birthdayId", title, "audioUrl", "isActive", "createdAt")
    VALUES ('music-priya', ${bdayId}, 'Joyful Birthday Acoustic Serenade', 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3', true, NOW())
  `

  // 5. Insert Memories
  const memories = [
    {
      id: 'mem-1',
      title: 'Unforgettable Sunset Beach Walk',
      description: 'Golden hour waves, endless laughter, and the soft warm breeze of summer memories.',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      order: 1
    },
    {
      id: 'mem-2',
      title: 'Spontaneous Weekend Road Trip',
      description: 'Blasting favorite songs on open highways and discovering hidden mountain viewpoints.',
      imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      order: 2
    },
    {
      id: 'mem-3',
      title: 'Cozy Winter Coffee & Book Sessions',
      description: 'Warm hot chocolate on rainy afternoons surrounded by cozy blankets and great books.',
      imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
      order: 3
    },
    {
      id: 'mem-4',
      title: 'Graduation Day Victory',
      description: 'Years of hard work, dedication, and proud smiles shared with close family and friends.',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
      order: 4
    },
    {
      id: 'mem-5',
      title: 'Stargazing Under the Open Sky',
      description: 'Counting shooting stars and making big wishes for the bright years ahead.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      order: 5
    },
    {
      id: 'mem-6',
      title: 'Surprise Birthday Party Blast',
      description: 'Confetti everywhere, genuine happy tears, and cake frosted all over!',
      imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      order: 6
    }
  ]

  for (const m of memories) {
    await sql`
      INSERT INTO "Memory" (id, "birthdayId", title, description, "imageUrl", "displayOrder", "createdAt")
      VALUES (${m.id}, ${bdayId}, ${m.title}, ${m.description}, ${m.imageUrl}, ${m.order}, NOW())
    `
  }

  // 6. Insert Timeline Events
  const timelineEvents = [
    {
      id: 'time-1',
      year: '2018',
      title: 'A Beautiful Beginning',
      description: 'Stepped into a brand new chapter with big dreams, high energy, and endless curiosity.',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      order: 1
    },
    {
      id: 'time-2',
      year: '2020',
      title: 'Finding True Passion',
      description: 'Discovered a deep creative calling and built meaningful lifelong friendships.',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      order: 2
    },
    {
      id: 'time-3',
      year: '2022',
      title: 'Major Milestone Achievements',
      description: 'Overcame big challenges with grace, courage, and unwavering perseverance.',
      imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
      order: 3
    },
    {
      id: 'time-4',
      year: '2024',
      title: 'Unforgettable Global Journey',
      description: 'Traveled to breath-taking destinations and embraced diverse cultures and perspectives.',
      imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      order: 4
    },
    {
      id: 'time-5',
      year: '2026',
      title: 'A Golden Year Ahead',
      description: 'Ready to shine brighter than ever, surrounded by immense love and limitless possibilities!',
      imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      order: 5
    }
  ]

  for (const t of timelineEvents) {
    await sql`
      INSERT INTO "TimelineEvent" (id, "birthdayId", year, title, description, "imageUrl", "displayOrder", "createdAt")
      VALUES (${t.id}, ${bdayId}, ${t.year}, ${t.title}, ${t.description}, ${t.imageUrl}, ${t.order}, NOW())
    `
  }

  // 7. Insert Birthday Wishes
  const wishes = [
    {
      id: 'wish-1',
      name: 'Aarav Sharma',
      message: 'Happy Birthday Priya! You inspire everyone around you with your positive energy. Wishing you your best year yet! 🎂✨'
    },
    {
      id: 'wish-2',
      name: 'Ananya Verma',
      message: 'To the sweetest soul! May your birthday be as magical, fun, and radiant as you are. Hugs and love! ❤️🎉'
    },
    {
      id: 'wish-3',
      name: 'Rohan Mehta',
      message: 'Happy Birthday! Keep smiling, keep shining, and never stop chasing your wildest dreams! 🚀⭐'
    },
    {
      id: 'wish-4',
      name: 'Siddharth & Family',
      message: 'Sending you warmest birthday blessings! May your day be packed with cake, joy, and unforgettable moments! 🎁🎈'
    }
  ]

  for (const w of wishes) {
    await sql`
      INSERT INTO "BirthdayWish" (id, "birthdayId", name, message, "isApproved", "createdAt")
      VALUES (${w.id}, ${bdayId}, ${w.name}, ${w.message}, true, NOW())
    `
  }

  console.log(`🎉 Demo Data Seeded into Neon PostgreSQL: Priya (/birthday/priya-2026)`)
  console.log('✅ ALL TABLES & SEED DATA EXECUTED 100% SUCCESSFULLY ON NEON POSTGRESQL!')
}

migrateAndSeed().catch((err) => {
  console.error('❌ Migration and Seed failed:', err)
})
