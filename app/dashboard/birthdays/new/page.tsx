import React from 'react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import BirthdayForm from '@/components/dashboard/BirthdayForm'

export default function NewBirthdayPage() {
  return (
    <div className="flex min-h-screen bg-[#0d0714] text-white">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Create New Birthday Celebration 🎉"
          subtitle="Fill in the birthday person's details to build their personalized website"
        />

        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          <div className="max-w-3xl bg-[#1a0f28]/95 rounded-3xl p-6 md:p-10 border border-white/12 shadow-2xl">
            <BirthdayForm isEditing={false} />
          </div>
        </main>
      </div>
    </div>
  )
}
