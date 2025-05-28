'use client'

import { Model, Session } from "@/lib/core/IModel";
import { PanelHeader } from "./panel/PanelHeader";
import { PanelInput } from "./panel/PanelInput";
import { ModelPreview } from "./panel/ModelPreview";
import { useState, forwardRef, useImperativeHandle } from "react";
import { v4 as uuidv4 } from 'uuid';
import { PanelChat } from "./panel/PanelChat";
import { usePlayground } from "@/contexts/PlaygroundContext";
import { toast } from "sonner";

export interface PlaygroundPanelRef {
  submitUserInput: (userInput: string) => Promise<void>;
}

interface PlaygroundPanelProps {
  session: Session;
  onAdd: (session: Session) => void;
  onUpdate: (session: Partial<Session>) => void;
  onClose: () => void;
  onSubmit?: (userInput: string) => Promise<void>;
}

const PlaygroundPanel = forwardRef<PlaygroundPanelRef, PlaygroundPanelProps>(({ session, onAdd, onUpdate, onClose, onSubmit }, ref) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { getApiKey, setOpenApiKeyDrawer } = usePlayground()

  const handleModelSelect = (model: Model) => {
    onUpdate({modelId: model.name, model: model, parameters: model.parameters})
  }

  const submitUserInput = async (userInput: string) => {
    setLoading(true);
    const userMessage = {id: uuidv4(), role: 'user' as const, content: userInput};

    const apiKey = await getApiKey(session.modelId)

    if (!apiKey) {
      toast.error('No API key found')
      setOpenApiKeyDrawer(true)
      setLoading(false)
      return
    }
    
    onUpdate({
      userInput: ''
    });
    
    // Add user message immediately
    onUpdate({
      messages: [...session.messages, userMessage]
    });

    const response = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-key': apiKey
      },
      body: JSON.stringify({
        messages: [...session.messages, userMessage],
        model: session
      })
    });

    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const assistantMessage = {id: uuidv4(), role: 'assistant' as const, content: ''};

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          if (line.startsWith('0:')) {
            const content = JSON.parse(line.substring(2).trim());

            assistantMessage.content += content;
            
            // Update messages with the new chunk
            onUpdate({
              messages: [...session.messages, userMessage, assistantMessage]
            });
          }
          // We can ignore other message types (f, e, d) as they're metadata
        }
      }
    } catch (error) {
      console.error('Error reading stream:', error);
    } finally {
      setLoading(false);
    }
  }

  // Expose submitUserInput through ref
  useImperativeHandle(ref, () => ({
    submitUserInput
  }));

  return (
    <div className="w-full min-w-128 h-full border border-gray-200 rounded-md flex flex-col overflow-hidden">
      <PanelHeader 
        session={session} 
        onSelect={handleModelSelect} 
        onAdd={onAdd} 
        onUpdate={onUpdate} 
        onClose={onClose} 
      />
      <div className="flex-1 border-t border-b border-gray-200 overflow-hidden">
        {
          session.messages.length > 0
          ? <PanelChat session={session} /> 
          : <ModelPreview model={session.model} />
        }
      </div>
      <div className="p-4 border-t border-gray-200">
        <PanelInput 
          session={session}
          onUpdate={onUpdate}
          onSubmit={async (userInput) => {
            if(onSubmit) {
              await onSubmit(userInput);
            }
          }}
          loading={loading}
        />
      </div>
    </div>
  )
})

PlaygroundPanel.displayName = 'PlaygroundPanel'

export default PlaygroundPanel;

