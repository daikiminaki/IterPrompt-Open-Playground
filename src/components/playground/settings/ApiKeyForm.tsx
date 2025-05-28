import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react"
import { models } from "@/lib/definitions"
import { ApiKeysMap } from "@/lib/core/IApiKey"

// Get unique providers from models
const providers = Array.from(new Set(models.map(model => model.name.split(':')[0])))

interface ApiKeyFormProps {
  apiKeys: ApiKeysMap
  setApiKeys: (apiKeys: ApiKeysMap) => void
  onSave?: () => void
}

export function ApiKeyForm({ apiKeys, setApiKeys, onSave }: ApiKeyFormProps) {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [validation, setValidation] = useState<Record<string, boolean>>({})

  const handleKeyChange = (provider: string, value: string) => {
    setApiKeys({
      ...apiKeys,
      [provider]: value
    })
    validateKey(provider, value)
  }

  const toggleKeyVisibility = (provider: string) => {
    setShowKeys(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }))
  }

  const validateKey = async (provider: string, key: string) => {
    try {
      // TODO: Implement actual API key validation
      // This is a placeholder for the actual validation logic
      const isValid = key.length > 0
      setValidation(prev => ({
        ...prev,
        [provider]: isValid
      }))
      return isValid
    } catch (error) {
      console.error(`Error validating ${provider} API key:`, error)
      return false
    }
  }

  const handleSave = async () => {
    const validations = await Promise.all(
      Object.entries(apiKeys).map(([provider, key]) => validateKey(provider, key))
    )

    if (validations.every(Boolean)) {
      // Save valid keys to localStorage
      Object.entries(apiKeys).forEach(([provider, key]) => {
        localStorage.setItem(`${provider}_api_key`, key)
      })
      onSave?.()
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {providers.map((provider) => (
          <div key={provider} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {provider.charAt(0).toUpperCase() + provider.slice(1)} API Key
              </label>
              {validation[provider] && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
            </div>
            <div className="relative">
              <Input
                type={showKeys[provider] ? "text" : "password"}
                name={`api-key-${provider}`}
                value={apiKeys[provider] || ""}
                onChange={(e) => handleKeyChange(provider, e.target.value)}
                placeholder={`Enter your ${provider} API key`}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => toggleKeyVisibility(provider)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showKeys[provider] ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {apiKeys[provider] && !validation[provider] && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Invalid API key format
              </p>
            )}
          </div>
        ))}
      </div>
      <Button 
        onClick={handleSave}
        className="w-full"
        disabled={Object.keys(apiKeys).length === 0}
      >
        Save API Keys
      </Button>
      <p className="text-xs text-gray-500">
        Your API keys are stored locally and never sent to our servers.
      </p>
    </div>
  )
} 