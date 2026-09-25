import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBirthdayBySlug } from '@/lib/data-store'
import { getThemeStyles } from '@/lib/themes'
import BirthdayCelebrationView from '@/components/BirthdayCelebrationView'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const birthday = await getBirthdayBySlug(slug)

  if (!birthday) {
    return {
      title: 'Birthday Celebration Not Found | Birthday Builder',
      description: 'The requested birthday celebration page could not be found.',
    }
  }

  const title = `Happy Birthday ${birthday.name} 🎉`
  const description = birthday.headline || `A special birthday celebration page created with love for ${birthday.name}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [birthday.profileImage],
      url: `/birthday/${birthday.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [birthday.profileImage],
    },
  }
}

export default async function PublicBirthdayPage({ params }: PageProps) {
  const { slug } = await params
  const birthday = await getBirthdayBySlug(slug)

  if (!birthday || !birthday.isPublished) {
    notFound()
  }

  const themeConfig = getThemeStyles(birthday.theme)

  return (
    <BirthdayCelebrationView birthday={birthday} themeStyle={themeConfig.style} />
  )
}
