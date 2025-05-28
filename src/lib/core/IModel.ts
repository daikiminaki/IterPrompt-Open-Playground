import { Message } from "ai";

export interface Model {
  id: string
  name: string
  displayName: string
  provider: string
  contextWindow: number
  maxOutputTokens: number
  description?: string
  knowledgeCutoff?: string
  pricing?: {
    inputPrice: number
    outputPrice: number
    audioInputPrice?: number
    audioOutputPrice?: number
    thinkingOutputPrice?: number
  }
  parameters: {
    temperature?: number
    maxTokens?: number
    topP?: number
    [key: string]: any
  }
  inputTypes: {
    text: boolean
    image: boolean
    audio: boolean
    video: boolean
  }
  modelPageUrl?: string
  pricingUrl?: string
  websiteUrl?: string
}

export interface Session {
  id: string
  name: string
  modelId: string
  model: Model
  parameters: {
    temperature?: number
    maxTokens?: number
    topP?: number
    reasoningEffort?: 'low' | 'medium' | 'high'
    [key: string]: any
  }
  userInput: string
  ragEnabled: boolean
  contextDocs: Document[]
  messages: Message[]
  isSynced: boolean
}

export interface ModelDropdownProps {
  onSelect: (model: Model) => void
  placeholder?: string
}

export interface ModelQueryProps {
  modelId: string
  messages: Message[]
  parameters: {
    temperature?: number
    maxTokens?: number
    topP?: number
    reasoningEffort?: 'low' | 'medium' | 'high'
    [key: string]: any
  }
  apiKey: string
}

export interface ModelEmbeddingQueryProps {
  input: string
  apiKey: string
}

export interface Document {
  id: string
  content: string
  metadata: {
    [key: string]: any
  }
}
