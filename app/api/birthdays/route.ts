import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionUser } from '@/lib/auth'
import { BirthdaySchema } from '@/lib/validations'
import { generateUniqueSlug } from '@/lib/slug'
import { getUserBirthdays, saveInMemoryBirthday } from '@/lib/data-store'

export async function GET() {
  try {
    const session = await getSessionUser()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const birthdays = await getUserBirthdays(session.id)
    return NextResponse.json(birthdays)
  } catch (error) {
    console.error('API GET /api/birthdays error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSessionUser()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = BirthdaySchema.parse(body)

    const slug = await generateUniqueSlug(validated.name, validated.birthdayDate)

    const memoriesInput = Array.isArray(body.memories) && body.memories.length > 0
      ? body.memories.map((m: any, idx: number) => ({
          title: m.title || `Memory #${idx + 1}`,
          description: m.description || '',
          imageUrl: m.imageUrl || '/images/rose_memory_1.webp',
          displayOrder: idx + 1,
        }))
      : [
          {
            title: 'Celebration Toast',
            description: 'Crystal rose champagne & golden lights',
            imageUrl: '/images/rose_memory_1.webp',
            displayOrder: 1,
          },
          {
            title: 'Sunset Beach Walk',
            description: 'Golden hour waves & glowing evening sky',
            imageUrl: '/images/rose_memory_2.webp',
            displayOrder: 2,
          },
          {
            title: '3-Tier Birthday Cake',
            description: 'Luxury cake adorned with edible gold foil',
            imageUrl: '/images/rose_birthday_cake.webp',
            displayOrder: 3,
          },
          {
            title: 'Gift Unboxing',
            description: 'Heartfelt personal notes & surprises',
            imageUrl: '/images/rose_gift_box.png',
            displayOrder: 4,
          }
        ]

    const timelineInput = Array.isArray(body.timelineEvents) && body.timelineEvents.length > 0
      ? body.timelineEvents.map((t: any, idx: number) => ({
          year: t.year || `${2018 + idx * 2}`,
          title: t.title || 'Milestone Achievement',
          description: t.description || '',
          imageUrl: t.imageUrl || null,
          displayOrder: idx + 1,
        }))
      : [
          {
            year: '2018',
            title: 'A Beautiful Beginning',
            description: 'Stepped into a brand new chapter with big dreams & endless curiosity.',
            displayOrder: 1,
          },
          {
            year: '2020',
            title: 'Finding True Passion',
            description: 'Discovered a deep creative calling and built lifelong friendships.',
            displayOrder: 2,
          },
          {
            year: '2022',
            title: 'Major Milestone Achievements',
            description: 'Overcame big challenges with grace and courage.',
            displayOrder: 3,
          },
          {
            year: '2024',
            title: 'Unforgettable Journey',
            description: 'Traveled to breath-taking destinations & embraced new perspectives.',
            displayOrder: 4,
          },
          {
            year: '2026',
            title: 'A Golden Year Ahead',
            description: 'Ready to shine brighter than ever with boundless possibilities!',
            displayOrder: 5,
          },
        ]

    try {
      const newBirthday = await prisma.birthday.create({
        data: {
          userId: session.id,
          name: validated.name,
          slug,
          birthdayDate: new Date(validated.birthdayDate),
          profileImage: validated.profileImage,
          headline: validated.headline,
          description: validated.description,
          personalMessage: validated.personalMessage,
          isPublished: validated.isPublished ?? true,
          theme: {
            create: {
              presetName: 'Romantic Pink',
              primaryColor: '#EC4899',
              secondaryColor: '#F43F5E',
              accentColor: '#FBBF24',
              backgroundColor: '#180816',
              fontStyle: 'sans',
            }
          },
          memories: {
            create: memoriesInput,
          },
          timelineEvents: {
            create: timelineInput,
          }
        },
        include: {
          theme: true,
          memories: true,
          timelineEvents: true,
          birthdayWishes: true,
          music: true,
        }
      })

      return NextResponse.json(newBirthday, { status: 201 })
    } catch (dbError) {
      console.warn('DB creation fallback to in-memory store:', dbError)
      const fallbackBirthday = {
        id: `bday-${Date.now()}`,
        userId: session.id,
        name: validated.name,
        slug,
        birthdayDate: new Date(validated.birthdayDate),
        profileImage: validated.profileImage,
        headline: validated.headline,
        description: validated.description,
        personalMessage: validated.personalMessage,
        isPublished: validated.isPublished ?? true,
        createdAt: new Date(),
        updatedAt: new Date(),
        theme: {
          id: `theme-${Date.now()}`,
          birthdayId: `bday-${Date.now()}`,
          presetName: 'Romantic Pink',
          primaryColor: '#EC4899',
          secondaryColor: '#F43F5E',
          accentColor: '#FBBF24',
          backgroundColor: '#180816',
          fontStyle: 'sans',
        },
        memories: memoriesInput.map((m: any, idx: number) => ({ id: `mem-${idx}`, ...m })),
        timelineEvents: timelineInput.map((t: any, idx: number) => ({ id: `time-${idx}`, ...t })),
        birthdayWishes: [],
        music: []
      }
      await saveInMemoryBirthday(fallbackBirthday as any)
      return NextResponse.json(fallbackBirthday, { status: 201 })
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0]?.message || 'Validation Error' }, { status: 400 })
    }
    console.error('API POST /api/birthdays error:', error)
    return NextResponse.json({ error: 'Failed to create birthday page' }, { status: 500 })
  }
}

