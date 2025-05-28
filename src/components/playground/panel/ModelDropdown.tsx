// components/ModelDropdown.tsx
import React, { useEffect, useState, useRef } from 'react'
import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { Loader2, ChevronDown, Check } from 'lucide-react'
import { ModelDropdownProps, Model } from '@/lib/core/IModel';
import { models, providerLogo } from '@/lib/definitions'
import Image from 'next/image'

export function ModelDropdown({
  onSelect,
  placeholder = 'Select model…',
}: ModelDropdownProps) {
  const [grouped, setGrouped] = useState<Record<string, Model[]>>({})
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Model>(models[0])
  const [selectedPreview, setSelectedPreview] = useState<Model>(models[0])
  const inputRef = useRef<HTMLInputElement>(null)

  // fetch list on mount
  useEffect(() => {
    const g: Record<string, Model[]> = {}
    models.forEach((m) => {
      g[m.provider] ??= []
      g[m.provider].push(m)
    })
    setGrouped(g)
  }, [])

  // fetch full config & fire callback
  const handleSelect = async (m: Model) => {
    setSelected(m)
    onSelect(m)
    setOpen(false)
  }

  const handleHover = (m: Model) => {
    setSelectedPreview(m)
  }

  // filter by displayName
  const filtered = React.useMemo(() => 
    Object.fromEntries(
      Object.entries(grouped)
        .map(([prov, arr]) => [
          prov,
          arr.filter((m) => {
            const searchStr = query.toLowerCase()
            return (
              m.displayName.toLowerCase().includes(searchStr) ||
              (m.description?.toLowerCase() || '').includes(searchStr) ||
              m.provider.toLowerCase().includes(searchStr)
            )
          }),
        ])
        .filter(([, arr]) => arr.length > 0)
    ) as Record<string, Model[]>,
    [grouped, query]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="inline-flex items-center justify-between w-full max-w-xs px-3 py-2 bg-white text-xs border border-gray-200 rounded-md hover:bg-gray-50">
          <div className="flex items-center gap-1">
            <Image
              src={providerLogo[selected.provider as keyof typeof providerLogo]} 
              alt={selected.provider} 
              width={16}
              height={16}
            />
            <span className="truncate">
              {selected?.displayName ?? placeholder}
            </span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-80 p-0 border border-gray-200 rounded-md">
        <div className="relative">
          <Command className='z-50' >
            <CommandInput
              ref={inputRef}
              value={query}
              onValueChange={(v) => setQuery(v)}
              autoFocus
              placeholder="Search models..."
              className="border-gray-200"
            />
            <CommandList>
              {Object.entries(filtered).map(([prov, arr]: [string, Model[]]) => (
                <CommandGroup key={prov} heading={prov} >
                  {arr.map((m: Model) => (
                    <CommandItem
                      key={m.id}
                      value={m.displayName}
                      disabled={false}
                      onSelect={() => handleSelect(m)}
                      onMouseEnter={() => handleHover(m)}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1">
                          <Image
                            src={providerLogo[m.provider as keyof typeof providerLogo]} 
                            alt={m.provider} 
                            width={16}
                            height={16}
                          />
                          <span className="text-gray-900 leading-tight">{m.displayName}</span>
                        </div>
                        {selected?.id === m.id && (
                          <Check className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
              <CommandEmpty>No models found.</CommandEmpty>
            </CommandList>
          </Command>

          {/* Floating Preview Window */}
          <div className="absolute left-[calc(100%+8px)] top-0 w-80 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="p-4">
              <div className="flex items-center gap-1 mb-3">
                <Image
                  src={providerLogo[selectedPreview.provider as keyof typeof providerLogo]} 
                  alt={selectedPreview.provider} 
                  width={16}
                  height={16}
                />
                <div className="text-sm font-semibold text-gray-900">{selectedPreview.displayName}</div>
              </div>
              <p className="text-xs text-gray-600 mb-3">{selectedPreview.description}</p>
              {selected ? (
                <div className="text-xs bg-white dark:bg-black divide-y">
                  <div className="flex items-start py-2">
                    <div className="font-medium w-28">Context</div>
                    <div className="flex-1 text-zinc-600 dark:text-zinc-400">{selectedPreview.contextWindow.toLocaleString()} tokens</div>
                  </div>
                  <div className="flex items-start py-2">
                    <div className="font-medium w-28">Input Pricing</div>
                    <div className="flex-1 text-zinc-600 dark:text-zinc-400">${selectedPreview.pricing?.inputPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 20 })} / million tokens</div>
                  </div>
                  <div className="flex items-start py-2">
                    <div className="font-medium w-28">Output Pricing</div>
                    <div className="flex-1 text-zinc-600 dark:text-zinc-400">${selectedPreview.pricing?.outputPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 20 })} / million tokens</div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500">Select a model to view details</div>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
