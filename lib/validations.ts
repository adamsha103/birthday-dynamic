import { z } from 'zod'

export const UserRegisterSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const UserLoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const BirthdaySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  birthdayDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid birthday date format',
  }),
  profileImage: z.string().min(1, 'Profile image URL or path is required'),
  headline: z.string().min(1, 'Headline is required').max(200, 'Headline is too long'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description is too long'),
  personalMessage: z.string().min(1, 'Personal message is required'),
  isPublished: z.boolean().optional().default(true),
}).passthrough()

export const MemorySchema = z.object({
  imageUrl: z.string().min(1, 'Image URL is required'),
  title: z.string().min(1, 'Title is required').max(150, 'Title is too long'),
  description: z.string().max(1000, 'Description is too long').default(''),
  displayOrder: z.number().int().default(0),
})

export const TimelineEventSchema = z.object({
  year: z.string().min(1, 'Year or timeframe is required').max(30, 'Year string too long'),
  title: z.string().min(1, 'Title is required').max(150, 'Title is too long'),
  description: z.string().max(1000, 'Description is too long').default(''),
  imageUrl: z.string().optional().nullable(),
  displayOrder: z.number().int().default(0),
})

export const BirthdayWishSchema = z.object({
  name: z.string().min(1, 'Name is required').max(60, 'Name cannot exceed 60 characters'),
  message: z.string().min(2, 'Wish message is required').max(800, 'Wish message cannot exceed 800 characters'),
})

export const ThemeSchema = z.object({
  presetName: z.string().default('Romantic Pink'),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color'),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color'),
  accentColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color'),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color'),
  fontStyle: z.enum(['sans', 'serif', 'mono']).default('sans'),
})

export const MusicSchema = z.object({
  title: z.string().min(1, 'Track title is required').max(100, 'Title too long'),
  audioUrl: z.string().min(1, 'Audio URL is required'),
  isActive: z.boolean().default(true),
})
