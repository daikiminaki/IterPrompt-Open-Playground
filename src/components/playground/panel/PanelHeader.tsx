import { Ellipsis, Plus, Settings, SlidersHorizontal, ToggleLeft, ToggleRight } from "lucide-react";
import { ModelDropdown } from "./ModelDropdown";
import { Model, Session } from "@/lib/core/IModel";
import { PlaygroundIconButton } from "@/components/ui/button";
import { useState } from "react";
import { defaultSession } from "@/lib/definitions";
import { ModelConfigPopover } from "./ModelConfigPopover";
import { PanelOptionsPopover } from "./PanelOptionsPopover";

interface PanelHeaderProps {
  session: Session
  onSelect: (model: Model) => void
  onAdd: (session: Session) => void
  onUpdate: (session: Partial<Session>) => void
  onClose: () => void
}

export function PanelHeader({ session, onSelect, onAdd, onUpdate, onClose }: PanelHeaderProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const createNewSession = () => {
    onAdd(defaultSession);
  }

  const handleModelConfigChange = (config: Partial<Model>) => {
    onUpdate({model: {...session.model, ...config}});
  }

  const handleClearChat = () => {
    onUpdate({messages: []});
  }

  const handleDeleteChat = () => {
    onClose();
  }

  const handleSyncChat = () => {
    onUpdate({isSynced: !session.isSynced});
  }

  return (
    <div className="flex flex-row gap-2 justify-between items-center bg-gray-50 px-4 py-3 h-fit rounded-t-lg">
      <ModelDropdown onSelect={onSelect} />
      <div className="flex flex-row items-center">
        {
          session.isSynced && 
            <div className="text-xs font-medium mr-0.5 text-gray-500 h-fit bg-gray-200 rounded-full px-2.5 py-1">Synced</div>
        }
        <PlaygroundIconButton
          icon={
            session.isSynced
            ? <div className="relative"><div className="absolute top-0 -right-0.5 w-2 h-2 bg-blue-500 rounded-full"></div><ToggleRight className="w-4 h-4" /></div>
            : <ToggleLeft className="w-4 h-4" />
          }
          tooltip="Sync chat messages with other models"
          onClick={handleSyncChat}
        />
        <ModelConfigPopover 
          model={session.model} 
          onConfigChange={handleModelConfigChange}
        >
          <PlaygroundIconButton 
            icon={<SlidersHorizontal className="w-4 h-4" />} 
            tooltip="Configure session" 
            onClick={() => {}} 
          />
        </ModelConfigPopover>
        <PlaygroundIconButton 
          icon={<Plus className="w-4 h-4" />} 
          tooltip="Add model to compare" 
          onClick={createNewSession} 
        />
        <PanelOptionsPopover
          onClearChat={handleClearChat}
          onDeleteChat={handleDeleteChat}
        >
          <PlaygroundIconButton 
            icon={<Ellipsis className="w-4 h-4" />} 
            tooltip="Settings" 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
          />
        </PanelOptionsPopover>
      </div>
    </div>
  )
}
