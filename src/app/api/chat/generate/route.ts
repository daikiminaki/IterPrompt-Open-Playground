import { generateLLMText } from '@/lib/ai/models';
import { Message } from 'ai';
import { Session } from '@/lib/core/IModel';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

interface ChatRequest {
  messages: Message[]
  model: Session
}

export async function POST(req: Request) {
  const { messages, model }: ChatRequest = await req.json();
  const apiKey = req.headers.get("x-user-key");
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Missing API key in header" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // Stream Model
  const result = await generateLLMText({
    modelId: model.modelId, 
    messages, 
    parameters: model.parameters,
    apiKey: apiKey
  });

  return new Response(
    JSON.stringify(result),
    { headers: { "Content-Type": "application/json" } }
  );
}