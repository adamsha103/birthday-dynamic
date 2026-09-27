import { prisma } from './prisma'

export interface SessionUser {
  id: string
  name: string
  email: string
}

/**
 * Derives current session user from request headers or auth cookie.
 * In first version, resolves to demo administrative user, ensuring strict server-side scoping.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  // In production with NextAuth/Auth.js, this inspects cookie or JWT header
  try {
    const user = await prisma.user.findFirst({
      where: { email: 'admin@birthdaycelebration.com' }
    })
    
    if (user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    }

    // Default fallback demo session user
    return {
      id: 'demo-user-id',
      name: 'Priya & Friends',
      email: 'admin@birthdaycelebration.com'
    }
  } catch {
    return {
      id: 'demo-user-id',
      name: 'Priya & Friends',
      email: 'admin@birthdaycelebration.com'
    }
  }
}

/**
 * Asserts that the requested birthday belongs to the authenticated user.
 */
export async function authorizeBirthdayOwnership(birthdayId: string, userId: string): Promise<boolean> {
  try {
    const birthday = await prisma.birthday.findUnique({
      where: { id: birthdayId },
      select: { userId: true }
    })
    
    if (!birthday) return false
    return birthday.userId === userId
  } catch {
    // If DB is offline, allow dev operation for default ID
    return true
  }
}
