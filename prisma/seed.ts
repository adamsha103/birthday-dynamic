import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clean up existing test data
  await prisma.birthday.deleteMany({
    where: { slug: 'priya-2026' }
  }).catch(() => {})
  await prisma.user.deleteMany({
    where: { email: 'admin@birthdaycelebration.com' }
  }).catch(() => {})

  // 1. Create Demo User
  const user = await prisma.user.create({
    data: {
      id: 'demo-user-id',
      name: 'Celebration Admin',
      email: 'admin@birthdaycelebration.com',
      passwordHash: '$2a$10$e8w3Xj0y.samplePasswordHashKeyForDevDemo',
    }
  })

  console.log(`👤 Created user: ${user.name} (${user.email})`)

  // 2. Create Demo Birthday Page for Nabesha
  await prisma.birthday.deleteMany({
    where: { slug: 'nabesha-2026' }
  }).catch(() => {})

  const birthday = await prisma.birthday.create({
    data: {
      userId: user.id,
      name: 'Nabesha',
      slug: 'nabesha-2026',
      birthdayDate: new Date('2026-10-05T00:00:00Z'),
      profileImage: '/images/rose_birthday_hero.png',
      headline: '🌹 A Special Day For An Extraordinary Soul 🌹',
      description: 'Welcome to Nabesha’s 2026 Birthday Celebration! Explore cherished rose memories, milestone stories, blow out the virtual candles, and celebrate with love!',
      personalMessage: 'Dear Nabesha, your smile brightens up the world around you and your warmth inspires everyone. May this year bring you boundless happiness, thrilling adventures, and true magic in every moment!',
      isPublished: true,
      theme: {
        create: {
          presetName: 'Luxury Rose',
          primaryColor: '#F43F5E',
          secondaryColor: '#FB7185',
          accentColor: '#F59E0B',
          backgroundColor: '#14070E',
          fontStyle: 'serif',
        }
      },
      music: {
        create: [
          {
            title: 'Joyful Birthday Serenade',
            audioUrl: '/audio/birthday_tune.wav',
            isActive: true,
          }
        ]
      },
      memories: {
        create: [
          {
            title: 'Romantic Rose Celebration Toast',
            description: 'Crystal rose champagne, golden lights, and unforgettable laughter.',
            imageUrl: '/images/rose_memory_1.png',
            displayOrder: 1,
          },
          {
            title: 'Rose Sunset Beach Walk',
            description: 'Golden hour waves, warm breeze, and glowing evening sky.',
            imageUrl: '/images/rose_memory_2.png',
            displayOrder: 2,
          },
          {
            title: '3-Tier Luxury Rose Cake',
            description: 'Decadent cake adorned with 24k edible gold foil and fresh rose petals.',
            imageUrl: '/images/rose_birthday_cake.png',
            displayOrder: 3,
          },
          {
            title: 'Luxury Satin Ribbon Gift Unboxing',
            description: 'Unboxing secret heartfelt notes and birthday surprise treasures.',
            imageUrl: '/images/rose_gift_box.png',
            displayOrder: 4,
          },
        ]
      },
      timelineEvents: {
        create: [
          {
            year: '2018',
            title: 'A Beautiful Beginning',
            description: 'Stepped into a brand new chapter with big dreams, high energy, and endless curiosity.',
            imageUrl: '/images/rose_birthday_hero.png',
            displayOrder: 1,
          },
          {
            year: '2020',
            title: 'Finding True Passion',
            description: 'Discovered a deep creative calling and built meaningful lifelong friendships.',
            imageUrl: '/images/rose_memory_1.png',
            displayOrder: 2,
          },
          {
            year: '2022',
            title: 'Major Milestone Achievements',
            description: 'Overcame big challenges with grace, courage, and unwavering perseverance.',
            imageUrl: '/images/rose_memory_2.png',
            displayOrder: 3,
          },
          {
            year: '2024',
            title: 'Unforgettable Global Journey',
            description: 'Traveled to breath-taking destinations and embraced diverse cultures and perspectives.',
            imageUrl: '/images/rose_memory_3.png',
            displayOrder: 4,
          },
          {
            year: '2026',
            title: 'A Golden Year Ahead',
            description: 'Ready to shine brighter than ever, surrounded by immense love and limitless possibilities!',
            imageUrl: '/images/rose_birthday_cake.png',
            displayOrder: 5,
          },
        ]
      },
      birthdayWishes: {
        create: [
          {
            name: 'Aarav Sharma',
            message: 'Happy Birthday Priya! You inspire everyone around you with your positive energy. Wishing you your best year yet! 🎂✨',
            isApproved: true,
          },
          {
            name: 'Ananya Verma',
            message: 'To the sweetest soul! May your birthday be as magical, fun, and radiant as you are. Hugs and love! ❤️🎉',
            isApproved: true,
          },
          {
            name: 'Rohan Mehta',
            message: 'Happy Birthday! Keep smiling, keep shining, and never stop chasing your wildest dreams! 🚀⭐',
            isApproved: true,
          },
          {
            name: 'Siddharth & Family',
            message: 'Sending you warmest birthday blessings! May your day be packed with cake, joy, and unforgettable moments! 🎁🎈',
            isApproved: true,
          },
        ]
      }
    }
  })

  console.log(`🎉 Created seed birthday celebration for: ${birthday.name} (URL: /birthday/${birthday.slug})`)
  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
