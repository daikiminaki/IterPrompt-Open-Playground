'use client';

import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { Session } from '@/lib/core/IModel';
import { models } from '@/lib/definitions';
import { ApiKeysMap } from '@/lib/core/IApiKey';

type SessionsMap = Record<string, Session>

interface PlaygroundContextType {
  sessions: SessionsMap
  setSessions: (sessions: SessionsMap) => void
  addSession: (template?: Partial<Session>) => void
  updateSession: (id: string, patch: Partial<Session>) => void
  removeSession: (id: string) => void
  apiKeys: ApiKeysMap
  setApiKeys: (apiKeys: ApiKeysMap) => void
  getApiKey: (modelId: string) => string | undefined
  openApiKeyDrawer: boolean
  setOpenApiKeyDrawer: (open: boolean) => void
  loading: Record<string, boolean>
  setLoading: (loading: Record<string, boolean>) => void
}

const PlaygroundContext = createContext<PlaygroundContextType | undefined>(undefined);

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<SessionsMap>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [apiKeys, setApiKeys] = useState<ApiKeysMap>({})
  const [openApiKeyDrawer, setOpenApiKeyDrawer] = useState(false)

  const getApiKey = (modelId: string) => {
    const [provider, _] = modelId.split(':')
    return apiKeys[provider]
  }

  const addSession = (template?: Partial<Session>) => {
    const id = crypto.randomUUID()
    setSessions((prev) => ({
      ...prev,
      [id]: {
        ...template,
        id,
        name: `Chat ${Object.keys(prev).length + 1}`,
        modelId: 'openai:gpt-4o-mini',
        model: models[0],
        parameters: { temperature: 0.7, max_tokens: 2048, top_p: 1 },
        ragEnabled: false,
        contextDocs: [],
        messages: [],
        userInput: '',
        isSynced: true,
      },
    }))
  }
  
  // update an existing session
  const updateSession = (id: string, patch: Partial<Session>) => {
    setSessions((prev) => {
      // If the session doesn't exist, return unchanged
      if (!prev[id]) return prev

      // If this is a userInput update and the session is synced
      if ('userInput' in patch && prev[id].isSynced) {
        const newUserInput = patch.userInput ?? ''
        // Update all synced sessions with the same userInput
        return Object.entries(prev).reduce((acc, [sessionId, session]) => {
          if (session.isSynced) {
            acc[sessionId] = { ...session, userInput: newUserInput }
          } else {
            acc[sessionId] = session
          }
          return acc
        }, {} as Record<string, Session>)
      }

      // For non-userInput updates or non-synced sessions, update only the target session
      return {
        ...prev,
        [id]: { ...prev[id], ...patch },
      }
    })
  }
  
  // remove one
  const removeSession = (id: string) => {
    setSessions((prev) => {
      const { [id]: _, ...rest } = prev
      return rest
    })
  }
  
  const value = useMemo(() => ({
    sessions, setSessions,
    addSession,
    updateSession,
    removeSession,
    apiKeys, 
    setApiKeys,
    getApiKey,
    openApiKeyDrawer,
    setOpenApiKeyDrawer,
    loading,
    setLoading
  }), [sessions, apiKeys, openApiKeyDrawer, loading])

  return (
    <PlaygroundContext.Provider 
      value={value}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}

export function usePlayground() {
  const context = useContext(PlaygroundContext);
  if (context === undefined) {
    throw new Error('usePlayground must be used within a PlaygroundProvider');
  }
  return context;
} 