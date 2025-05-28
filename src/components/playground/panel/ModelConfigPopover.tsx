import { 
  Popover, 
  PopoverTrigger, 
  PopoverContent 
} from '@/components/ui/popover'
import { Model } from '@/lib/core/IModel'

interface ModelConfigPopoverProps {
  children: React.ReactNode
  model: Model
  onConfigChange?: (config: Partial<Model>) => void
}

export function ModelConfigPopover({ children, model, onConfigChange }: ModelConfigPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer">
          {children}
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">{model.provider} Configs</h3>
          </div>
          
          <div className="space-y-3">
            {/* Temperature */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Temperature</label>
                <span className="text-xs text-gray-500">{model.parameters.temperature}</span>
              </div>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.1"
                defaultValue={model.parameters.temperature ?? 0.7}
                className="w-full mt-1"
                onChange={(e) => onConfigChange?.({
                  parameters: {
                    ...model.parameters,
                    temperature: parseFloat(e.target.value)
                  }
                })}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Precise</span>
                <span>Creative</span>
              </div>
            </div>

            {/* Max Tokens */}
            <div>
              <label className="text-sm font-medium text-gray-700">Max Tokens</label>
              <input
                type="number"
                min="1"
                max={model.contextWindow}
                defaultValue={model.parameters.maxTokens ?? 2048}
                className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md"
                onChange={(e) => onConfigChange?.({
                  parameters: {
                    ...model.parameters,
                    maxTokens: parseInt(e.target.value)
                  }
                })}
              />
            </div>

            {/* Top P */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Top P</label>
                <span className="text-xs text-gray-500">{model.parameters.topP}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                defaultValue={model.parameters.topP ?? 1}
                className="w-full mt-1"
                onChange={(e) => onConfigChange?.({
                  parameters: {
                    ...model.parameters,
                    topP: parseFloat(e.target.value)
                  }
                })}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Focused</span>
                <span>Diverse</span>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
