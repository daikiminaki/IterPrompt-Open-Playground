'use client'

import { Plus, History } from 'lucide-react'
import { SiderIconButton } from '../ui/button'
import ApiKeyDrawer from './settings/ApiKeyDrawer'

export default function PlaygroundSider() {

  return (
    <aside className="w-[64px] bg-white border-r border-gray-200 p-4 flex flex-col space-y-4">
      <div className="flex flex-col items-center py-2 space-y-2">
        {/* New Chat Button */}
        <SiderIconButton
          icon={<Plus className="w-5 h-5" />}
          tooltip="New chat"
          onClick={() => {}}
        />

        {/* History Button */}
        <SiderIconButton
          icon={<History className="w-5 h-5" />}
          tooltip="History"
          onClick={() => {}}
        />

        {/* APIKey Button */}
        <ApiKeyDrawer />
      </div>
    </aside>
  )
}
