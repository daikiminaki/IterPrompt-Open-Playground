'use client'

import PlaygroundPanel, { PlaygroundPanelRef } from "./PlaygroundPanel";
import { usePlayground } from "@/contexts/PlaygroundContext";
import { defaultSession } from "@/lib/definitions";
import { useEffect, useRef } from "react";

export default function PlaygroundMain() {
  const { sessions, addSession, updateSession, removeSession } = usePlayground()
  const panelRefs = useRef<Record<string, PlaygroundPanelRef>>({})

  const fetchSessions = async () => {
    addSession(defaultSession)
  }

  useEffect(() => {
    if (Object.keys(sessions).length === 0) {
      fetchSessions()
    }
  }, [sessions])

  const handleSubmit = async (sessionId: string, userInput: string) => {
    // Only proceed if the source session is synced
    if (!sessions[sessionId]?.isSynced) return;

    // Get all other synced sessions
    const syncedSessions = Object.entries(sessions).filter(([id, session]) => 
      session.isSynced
    );
    
    // Submit to all other synced sessions independently
    syncedSessions.forEach(([id, _]) => {
      // Fire and forget - don't await the submissions
      panelRefs.current[id]?.submitUserInput(userInput)
        .catch(error => console.error(`Error submitting to panel ${id}:`, error));
    });
  }

  return (
    <main className="flex-1 overflow-hidden">
      <div className="grid grid-flow-col gap-2 p-2 w-full h-full overflow-x-auto">
        {Object.keys(sessions).length > 0 && 
          Object.values(sessions).map((session) => (
            <PlaygroundPanel 
              key={session.id} 
              ref={(ref) => {
                if (ref) {
                  panelRefs.current[session.id] = ref
                } else {
                  delete panelRefs.current[session.id]
                }
              }}
              session={session} 
              onAdd={addSession} 
              onUpdate={(patch) => updateSession(session.id, patch)} 
              onClose={() => removeSession(session.id)}
              onSubmit={(userInput) => handleSubmit(session.id, userInput)}
            />
          ))
        }
      </div>
    </main>
  )
}
