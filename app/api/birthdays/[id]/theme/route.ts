import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionUser, authorizeBirthdayOwnership } from '@/lib/auth'
import { ThemeSchema } from '@/lib/validations'
import { getBirthdayById } from '@/lib/data-store'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const birthday = await getBirthdayById(id)
    if (!birthday) return NextResponse.json({ error: 'Birthday not found' }, { status: 404 })
    return NextResponse.json(birthday.theme || {})
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSessionUser()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const isAuthorized = await authorizeBirthdayOwnership(id, session.id)
    if (!isAuthorized) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const validated = ThemeSchema.parse(body)

    try {
      const theme = await prisma.birthdayTheme.upsert({
        where: { birthdayId: id },
        update: {
          presetName: validated.presetName,
          primaryColor: validated.primaryColor,
          secondaryColor: validated.secondaryColor,
          accentColor: validated.accentColor,
          backgroundColor: validated.backgroundColor,
          fontStyle: validated.fontStyle,
        },
        create: {
          birthdayId: id,
          presetName: validated.presetName,
          primaryColor: validated.primaryColor,
          secondaryColor: validated.secondaryColor,
          accentColor: validated.accentColor,
          backgroundColor: validated.backgroundColor,
          fontStyle: validated.fontStyle,
        }
      })
      return NextResponse.json(theme)
    } catch (dbErr) {
      const fallbackTheme = {
        id: `theme-${id}`,
        birthdayId: id,
        ...validated
      }
      return NextResponse.json(fallbackTheme)
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0]?.message || 'Validation Error' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update theme' }, { status: 500 })
  }
}
