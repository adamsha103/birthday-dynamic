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
  profileImage: '/images/photo_3.webp',
  headline: '✨ A Golden Celebration of Grace, Warmth, and Beauty ✨',
  description: 'Celebrating three breathtaking years together from 2024 to 2026. Today is all about honoring you and the joy you bring to my life.',
  personalMessage: 'From our very first conversation in 2024 to this golden celebration in 2026, my love and admiration for you have only multiplied. May every dream in your heart turn to gold this year! 🌟👑',
  isPublished: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  theme: {
    id: 'theme-1',
    birthdayId: 'nabesha-demo-id',
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
      birthdayId: 'nabesha-demo-id',
      title: 'Anbe En Anbe (Lofi Remix)',
      audioUrl: '/audio/anbe_en_anbe_lofi.mp3',
      isActive: true,
    }
  ],
  memories: [
    {
      id: 'mem-1',
      birthdayId: 'nabesha-demo-id',
      title: 'Sweet Celebration Toast',
      description: 'Warm golden evening lights, peaceful conversations, and unforgettable shared laughter.',
      imageUrl: '/images/pho.webp',
      displayOrder: 1,
      createdAt: new Date()
    },
    {
      id: 'mem-2',
      birthdayId: 'nabesha-demo-id',
      title: 'Golden Sunset Glow',
      description: 'A serene walk under amber skies, feeling the gentle breeze and pure joy.',
      imageUrl: '/images/photo_2_1x1.webp',
      displayOrder: 2,
      createdAt: new Date()
    },
    {
      id: 'mem-3',
      birthdayId: 'nabesha-demo-id',
      title: '3-Tier Luxury Rose Cake',
      description: 'Crafted with sweet confection, edible gold, and fresh velvet petals to honor your day.',
      imageUrl: '/images/cakee.webp',
      displayOrder: 3,
      createdAt: new Date()
    },
    {
      id: 'mem-4',
      birthdayId: 'nabesha-demo-id',
      title: 'Elegance & Radiance',
      description: 'Your genuine smile that effortlessly illuminates every room and brightens my world.',
      imageUrl: '/images/profile.webp',
      displayOrder: 4,
      createdAt: new Date()
    }
  ],
  timelineEvents: [
    {
      id: 'time-1',
      birthdayId: 'nabesha-demo-id',
      year: '2024',
      title: 'The Beautiful Beginning (2024)',
      description: 'The unforgettable year our paths first crossed. From our very first hello, you brought an undeniable warmth, kindness, and excitement into my life.',
      imageUrl: '/images/photo_3.webp',
      displayOrder: 1,
      createdAt: new Date()
    },
    {
      id: 'time-2',
      birthdayId: 'nabesha-demo-id',
      year: '2025',
      title: 'Growing Inseparable & Deep Bonding (2025)',
      description: 'A whole year of standing together through every high and low, sharing inside jokes, late-night talks, and building an unbreakable trust.',
      imageUrl: '/images/pho.webp',
      displayOrder: 2,
      createdAt: new Date()
    },
    {
      id: 'time-3',
      birthdayId: 'nabesha-demo-id',
      year: '2026',
      title: 'Three Years Strong & Your Golden Birthday (2026)',
      description: 'Three precious years side-by-side! Today we celebrate your birthday with boundless gratitude, wishing you a lifetime of prosperity and laughter.',
      imageUrl: '/images/cakee.webp',
      displayOrder: 3,
      createdAt: new Date()
    }
  ],
  birthdayWishes: [
    {
      id: 'wish-1',
      birthdayId: 'nabesha-demo-id',
      name: 'Aarav Sharma',
      message: 'Happy Birthday Nabesha! Your positive energy and kindness inspire everyone around you. Wishing you your most incredible year yet! 🎂✨',
      isApproved: true,
      createdAt: new Date()
    },
    {
      id: 'wish-2',
      birthdayId: 'nabesha-demo-id',
      name: 'Ananya Verma',
      message: 'To the sweetest soul! May your 2026 birthday be as magical, fun, and radiant as you are. Big hugs and love! ❤️🎉',
      isApproved: true,
      createdAt: new Date()
    },
    {
      id: 'wish-3',
      birthdayId: 'nabesha-demo-id',
      name: 'Rohan Mehta',
      message: 'Happy Birthday Nabesha! Keep shining with that contagious smile and never stop chasing your wildest dreams! 🚀⭐',
      isApproved: true,
      createdAt: new Date()
    },
    {
      id: 'wish-4',
      birthdayId: 'nabesha-demo-id',
      name: 'Siddharth & Family',
      message: 'Sending you warmest birthday blessings! May your day and year ahead be packed with cake, peace, and unforgettable moments! 🎁🎈',
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
  // 1. Query Prisma database first so live dashboard edits are reflected immediately
  try {
    const birthday = await prisma.birthday.findFirst({
      where: {
        OR: [
          { slug },
          { id: slug },
        ]
      },
      include: {
        memories: { orderBy: { displayOrder: 'asc' } },
        timelineEvents: { orderBy: { displayOrder: 'asc' } },
        birthdayWishes: { where: { isApproved: true }, orderBy: { createdAt: 'desc' } },
        theme: true,
        music: true,
      }
    })

    if (birthday) {
      const bDetails = birthday as BirthdayWithDetails
      inMemoryBirthdays.set(birthday.id, bDetails)
      inMemoryBirthdays.set(birthday.slug, bDetails)
      if (birthday.slug === 'nabesha-2026' || birthday.slug === 'priya-2026') {
        Object.assign(FALLBACK_PRIYA_BIRTHDAY, bDetails)
      }
      return bDetails
    }
  } catch (err) {
    console.warn('Prisma DB query issue, serving in-memory fallback:', err)
  }

  // 2. Check inMemoryBirthdays map for session updates
  if (inMemoryBirthdays.has(slug)) {
    return inMemoryBirthdays.get(slug)!
  }
  for (const b of inMemoryBirthdays.values()) {
    if (b.slug === slug) return b
  }

  // 3. Fallback for demo slugs
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
