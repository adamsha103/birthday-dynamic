import { prisma } from './prisma'

/**
 * Converts a raw string into a clean, URL-safe slug format
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')             // Trim - from end of text
}

/**
 * Generates a unique slug for a birthday record.
 * Handles collisions by appending incrementing numbers or date/cuid suffixes.
 */
export async function generateUniqueSlug(
  name: string,
  birthdayDate?: string | Date,
  currentBirthdayId?: string
): Promise<string> {
  const baseNameSlug = slugify(name) || 'celebration'
  
  let dateSuffix = ''
  if (birthdayDate) {
    const d = new Date(birthdayDate)
    if (!isNaN(d.getTime())) {
      dateSuffix = `-${d.getFullYear()}`
    }
  }

  let candidateSlug = `${baseNameSlug}${dateSuffix}`
  
  try {
    // Check if candidate slug already exists for another birthday
    const existing = await prisma.birthday.findFirst({
      where: {
        slug: candidateSlug,
        ...(currentBirthdayId ? { NOT: { id: currentBirthdayId } } : {})
      }
    })

    if (!existing) {
      return candidateSlug
    }

    // Collision exists! Append random alphanumeric suffix or counter
    let counter = 2
    while (true) {
      const testSlug = `${candidateSlug}-${counter}`
      const collision = await prisma.birthday.findFirst({
        where: {
          slug: testSlug,
          ...(currentBirthdayId ? { NOT: { id: currentBirthdayId } } : {})
        }
      })
      if (!collision) {
        return testSlug
      }
      counter++
    }
  } catch (error) {
    // Fallback if DB is disconnected in mock preview mode
    console.warn('Slug uniqueness check fallback:', error)
    return `${candidateSlug}-${Math.random().toString(36).substring(2, 6)}`
  }
}
