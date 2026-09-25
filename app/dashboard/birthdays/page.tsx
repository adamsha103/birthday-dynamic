import React from 'react'
import { getSessionUser } from '@/lib/auth'
import { getUserBirthdays } from '@/lib/data-store'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import BirthdaysManager from '@/components/dashboard/BirthdaysManager'

export default async function AllBirthdaysPage() {
  const session = await getSessionUser()
  const birthdays = session ? await getUserBirthdays(session.id) : []

  return (
    <div className="flex min-h-screen bg-[#0d0914] text-white">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="All Birthday Celebrations"
          subtitle="View, manage, edit, publish, or delete all your created birthday pages"
        />

        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          <BirthdaysManager initialBirthdays={birthdays} />
        </main>
      </div>
    </div>
  )
}

