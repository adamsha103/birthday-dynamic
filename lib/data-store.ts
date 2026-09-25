import { prisma } from './prisma'

export interface BirthdayWithDetails {
  id: string
  userId: string
  name: string
  slug: string
  birthdayDate: Date | string
  profileImage: string
  headline: string
  description: string
  personalMessage: string
  isPublished: boolean
  createdAt: Date | string
  updatedAt: Date | string
  memories: any[]
  timelineEvents: any[]
  birthdayWishes: any[]
  theme: any | null
  music: any[]
}

// In-memory fallback dataset for Priya demo when DB is disconnected
const FALLBACK_PRIYA_BIRTHDAY: BirthdayWithDetails = {
  id: 'nabesha-demo-id',
  userId: 'demo-user-id',
  name: 'Nabesha',
  slug: 'nabesha-2026',
  birthdayDate: new Date('2026-10-05T00:00:00Z'),
  profileImage: '/images/rose_birthday_hero.png',
  headline: '🌹 A Special Day For An Extraordinary Soul 🌹',
  description: 'Welcome to Nabesha’s 2026 Birthday Celebration! Explore cherished rose memories, milestone stories, blow out the virtual candles, and celebrate with love!',
  personalMessage: 'Dear Nabesha, your smile brightens up the world around you and your warmth inspires everyone. May this year bring you boundless happiness, thrilling adventures, and true magic in every moment!',
  isPublished: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  theme: {
    id: 'theme-1',
    birthdayId: 'priya-demo-id',
    presetName: 'Luxury Rose',
    primaryColor: '#F43F5E',
    secondaryColor: '#FB7185',
    accentColor: '#F59E0B',
    backgroundColor: '#14070E',
    fontStyle: 'serif',
  },
  music: [
    {
      id: 'music-1',
      birthdayId: 'priya-demo-id',
      title: 'Joyful Birthday Serenade',
      audioUrl: '/audio/birthday_tune.wav',
      isActive: true,
    }
  ],
  memories: [
    {
      id: 'mem-1',
      birthdayId: 'priya-demo-id',
      title: 'Romantic Rose Celebration Toast',
      description: 'Crystal rose champagne, golden lights, and unforgettable laughter.',
      imageUrl: '/images/rose_memory_1.png',
      displayOrder: 1,
      createdAt: new Date()
    },
    {
      id: 'mem-2',
      birthdayId: 'priya-demo-id',
      title: 'Rose Sunset Beach Walk',
      description: 'Golden hour waves, warm breeze, and glowing evening sky.',
      imageUrl: '/images/rose_memory_2.png',
      displayOrder: 2,
      createdAt: new Date()
    },
    {
      id: 'mem-3',
      birthdayId: 'priya-demo-id',
      title: '3-Tier Luxury Rose Cake',
      description: 'Decadent cake adorned with 24k edible gold foil and fresh rose petals.',
      imageUrl: '/images/rose_birthday_cake.png',
      displayOrder: 3,
      createdAt: new Date()
    },
    {
      id: 'mem-4',
      birthdayId: 'priya-demo-id',
      title: 'Luxury Satin Ribbon Gift Unboxing',
      description: 'Unboxing secret heartfelt notes and birthday surprise treasures.',
      imageUrl: '/images/rose_gift_box.png',
      displayOrder: 4,
      createdAt: new Date()
    },
    {
      id: 'mem-5',
      birthdayId: 'priya-demo-id',
      title: 'Stargazing Under Open Rose Sky',
      description: 'Counting shooting stars and making big wishes for the bright years ahead.',
      imageUrl: '/images/rose_birthday_hero.png',
      displayOrder: 5,
      createdAt: new Date()
    },
  ],
  timelineEvents: [
    {
      id: 'time-1',
      birthdayId: 'priya-demo-id',
      year: '2018',
      title: 'A Beautiful Beginning',
      description: 'Stepped into a brand new chapter with big dreams, high energy, and endless curiosity.',
      imageUrl: '/images/rose_birthday_hero.png',
      displayOrder: 1,
      createdAt: new Date()
    },
    {
      id: 'time-2',
      birthdayId: 'priya-demo-id',
      year: '2020',
      title: 'Finding True Passion',
      description: 'Discovered a deep creative calling and built meaningful lifelong friendships.',
      imageUrl: '/images/rose_memory_1.png',
      displayOrder: 2,
      createdAt: new Date()
    },
    {
      id: 'time-3',
      birthdayId: 'priya-demo-id',
      year: '2022',
      title: 'Major Milestone Achievements',
      description: 'Overcame big challenges with grace, courage, and unwavering perseverance.',
      imageUrl: '/images/rose_memory_2.png',
      displayOrder: 3,
      createdAt: new Date()
    },
    {
      id: 'time-4',
      birthdayId: 'priya-demo-id',
      year: '2024',
      title: 'Unforgettable Global Journey',
      description: 'Traveled to breath-taking destinations and embraced diverse cultures and perspectives.',
      imageUrl: '/images/rose_memory_3.png',
      displayOrder: 4,
      createdAt: new Date()
    },
    {
      id: 'time-5',
      birthdayId: 'priya-demo-id',
      year: '2026',
      title: 'A Golden Year Ahead',
      description: 'Ready to shine brighter than ever, surrounded by immense love and limitless possibilities!',
      imageUrl: '/images/rose_birthday_cake.png',
      displayOrder: 5,
      createdAt: new Date()
    }
  ],
  birthdayWishes: [
    {
      id: 'wish-1',
      birthdayId: 'priya-demo-id',
      name: 'Aarav Sharma',
      message: 'Happy Birthday Priya! You inspire everyone around you with your positive energy. Wishing you your best year yet! 🎂✨',
      isApproved: true,
      createdAt: new Date()
    },
    {
      id: 'wish-2',
      birthdayId: 'priya-demo-id',
      name: 'Ananya Verma',
      message: 'To the sweetest soul! May your birthday be as magical, fun, and radiant as you are. Hugs and love! ❤️🎉',
      isApproved: true,
      createdAt: new Date()
    },
    {
      id: 'wish-3',
      birthdayId: 'priya-demo-id',
      name: 'Rohan Mehta',
      message: 'Happy Birthday! Keep smiling, keep shining, and never stop chasing your wildest dreams! 🚀⭐',
      isApproved: true,
      createdAt: new Date()
    },
    {
      id: 'wish-4',
      birthdayId: 'priya-demo-id',
      name: 'Siddharth & Family',
      message: 'Sending you warmest birthday blessings! May your day be packed with cake, joy, and unforgettable moments! 🎁🎈',
      isApproved: true,
      createdAt: new Date()
    }
  ]
}

// In-memory store fallback for dev session changes
const inMemoryBirthdays: Map<string, BirthdayWithDetails> = new Map()
inMemoryBirthdays.set(FALLBACK_PRIYA_BIRTHDAY.id, FALLBACK_PRIYA_BIRTHDAY)
inMemoryBirthdays.set(FALLBACK_PRIYA_BIRTHDAY.slug, FALLBACK_PRIYA_BIRTHDAY)

export async function getBirthdayBySlug(slug: string): Promise<BirthdayWithDetails | null> {
  // 1. Check inMemoryBirthdays map for instant live session updates
  if (inMemoryBirthdays.has(slug)) {
    return inMemoryBirthdays.get(slug)!
  }
  for (const b of inMemoryBirthdays.values()) {
    if (b.slug === slug) return b
  }

  // 2. Query Prisma database
  try {
    const birthday = await prisma.birthday.findUnique({
      where: { slug },
      include: {
        memories: { orderBy: { displayOrder: 'asc' } },
        timelineEvents: { orderBy: { displayOrder: 'asc' } },
        birthdayWishes: { where: { isApproved: true }, orderBy: { createdAt: 'desc' } },
        theme: true,
        music: true,
      }
    })

    if (birthday) {
      inMemoryBirthdays.set(birthday.id, birthday as BirthdayWithDetails)
      inMemoryBirthdays.set(birthday.slug, birthday as BirthdayWithDetails)
      return birthday as BirthdayWithDetails
    }
  } catch (err) {
    console.warn('Prisma DB query issue, serving in-memory fallback:', err)
  }

  // If slug matches nabesha or priya demo
  if (slug === 'nabesha' || slug === 'nabesha-2026' || slug === 'priya' || slug === 'priya-2026') {
    return FALLBACK_PRIYA_BIRTHDAY
  }

  return null
}

export async function getBirthdayById(id: string): Promise<BirthdayWithDetails | null> {
  if (inMemoryBirthdays.has(id)) {
    return inMemoryBirthdays.get(id)!
  }

  try {
    const birthday = await prisma.birthday.findUnique({
      where: { id },
      include: {
        memories: { orderBy: { displayOrder: 'asc' } },
        timelineEvents: { orderBy: { displayOrder: 'asc' } },
        birthdayWishes: { orderBy: { createdAt: 'desc' } },
        theme: true,
        music: true,
      }
    })

    if (birthday) {
      inMemoryBirthdays.set(birthday.id, birthday as BirthdayWithDetails)
      inMemoryBirthdays.set(birthday.slug, birthday as BirthdayWithDetails)
      return birthday as BirthdayWithDetails
    }
  } catch (err) {
    console.warn('Prisma DB query issue, serving in-memory fallback:', err)
  }

  return inMemoryBirthdays.get(id) || (id === 'priya-demo-id' || id === 'nabesha-demo-id' ? FALLBACK_PRIYA_BIRTHDAY : null)
}

export async function getUserBirthdays(userId: string): Promise<BirthdayWithDetails[]> {
  try {
    const list = await prisma.birthday.findMany({
      where: { userId },
      include: {
        memories: { orderBy: { displayOrder: 'asc' } },
        timelineEvents: { orderBy: { displayOrder: 'asc' } },
        birthdayWishes: true,
        theme: true,
        music: true,
      },
      orderBy: { createdAt: 'desc' }
    })

    if (list && list.length > 0) {
      for (const b of list) {
        inMemoryBirthdays.set(b.id, b as BirthdayWithDetails)
        inMemoryBirthdays.set(b.slug, b as BirthdayWithDetails)
      }
      return list as BirthdayWithDetails[]
    }
  } catch (err) {
    console.warn('Prisma DB fetch error, returning fallback birthdays list:', err)
  }

  return Array.from(inMemoryBirthdays.values()).filter(b => b.userId === userId || userId === 'demo-user-id')
}

export async function saveInMemoryBirthday(birthday: BirthdayWithDetails) {
  inMemoryBirthdays.set(birthday.id, birthday)
  inMemoryBirthdays.set(birthday.slug, birthday)

  if (birthday.slug === 'nabesha-2026' || birthday.slug === 'nabesha' || birthday.slug === 'priya-2026') {
    Object.assign(FALLBACK_PRIYA_BIRTHDAY, birthday)
  }
}
