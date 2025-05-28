import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandList, CommandItem } from "@/components/ui/command"
import { MessageSquareX, Trash2 } from "lucide-react"

interface PanelOptionsPopoverProps {
  children: React.ReactNode
  onClearChat: () => void
  onDeleteChat: () => void
}

export const PanelOptionsPopover = ({ children, onClearChat, onDeleteChat }: PanelOptionsPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-0">
        <Command>
          <CommandList className="p-2">
            <CommandItem onSelect={onClearChat} className="text-gray-900 cursor-pointer">
              <MessageSquareX className="mr-2 h-4 w-4 text-gray-900 hover:text-gray-500" />
              <span className="text-gray-900 hover:text-gray-500">Clear Chat</span>
            </CommandItem>
            <CommandItem onSelect={onDeleteChat} className="text-red-500 cursor-pointer">
              <Trash2 className="mr-2 h-4 w-4 text-red-500 hover:text-red-400" />
              <span className="text-red-500 hover:text-red-400">Delete Chat</span>
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
