export interface ThemePreset {
  id: string
  name: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundColor: string
  fontStyle: 'sans' | 'serif' | 'mono'
  description: string
}

export const PRESET_THEMES: ThemePreset[] = [
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    accentColor: '#F59E0B',
    backgroundColor: '#0F0728',
    fontStyle: 'sans',
    description: 'Majestic deep purple with vibrant magenta and golden warm glows.'
  },
  {
    id: 'romantic-pink',
    name: 'Romantic Pink',
    primaryColor: '#EC4899',
    secondaryColor: '#F43F5E',
    accentColor: '#FBBF24',
    backgroundColor: '#180816',
    fontStyle: 'serif',
    description: 'Sweet, passionate rose tones paired with elegant serif typography.'
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#06B6D4',
    backgroundColor: '#0B1329',
    fontStyle: 'sans',
    description: 'Deep cosmic blues and violet highlights with electric cyan accents.'
  },
  {
    id: 'elegant-gold',
    name: 'Elegant Gold',
    primaryColor: '#EAB308',
    secondaryColor: '#D97706',
    accentColor: '#F59E0B',
    backgroundColor: '#120E05',
    fontStyle: 'serif',
    description: 'Opulent warm gold and bronze tones for a ultra-luxurious celebration.'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    primaryColor: '#F97316',
    secondaryColor: '#EF4444',
    accentColor: '#EAB308',
    backgroundColor: '#1C0D0A',
    fontStyle: 'sans',
    description: 'Fiery twilight oranges and warm crimson rays.'
  },
  {
    id: 'luxury-black',
    name: 'Luxury Black',
    primaryColor: '#E2E8F0',
    secondaryColor: '#94A3B8',
    accentColor: '#38BDF8',
    backgroundColor: '#090D16',
    fontStyle: 'mono',
    description: 'Sleek, futuristic dark obsidian theme with crisp platinum accents.'
  },
  {
    id: 'soft-lavender',
    name: 'Soft Lavender',
    primaryColor: '#A855F7',
    secondaryColor: '#38BDF8',
    accentColor: '#F472B6',
    backgroundColor: '#130C24',
    fontStyle: 'sans',
    description: 'Dreamy soft lavender and sky-blue hues with playful sparkles.'
  }
]

export function getThemeStyles(theme: any) {
  const primary = theme?.primaryColor || '#EC4899'
  const secondary = theme?.secondaryColor || '#F43F5E'
  const accent = theme?.accentColor || '#FBBF24'
  const bg = theme?.backgroundColor || '#180816'

  let fontFamily = 'var(--font-sans), sans-serif'
  if (theme?.fontStyle === 'serif') {
    fontFamily = 'Georgia, Cambria, "Times New Roman", Times, serif'
  } else if (theme?.fontStyle === 'mono') {
    fontFamily = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
  }

  return {
    style: {
      '--primary': primary,
      '--secondary': secondary,
      '--accent': accent,
      '--background': bg,
      backgroundColor: bg,
      fontFamily,
    } as React.CSSProperties,
    primary,
    secondary,
    accent,
    bg,
  }
}
