import { generateText, streamText } from "ai";
import { generateEmbedding } from "./embeddings";
import { ModelEmbeddingQueryProps, ModelQueryProps } from "../core/IModel";
import { 
  openai, 
  anthropic, 
  cohere, 
  deepinfra, 
  deepseek, 
  groq, 
  mistral, 
  perplexity, 
  xai
} from "./providers";

export const getModel = (modelId: string, apiKey: string) => {
  const [provider, modelName] = modelId.split(':')

  if (!provider || !modelName) {
    throw new Error('Invalid modelId format. Expected format: "provider:model"')
  }
  
  switch (provider) {
    case 'openai':
      return openai(modelName, apiKey)
    case 'anthropic':
      return anthropic(modelName, apiKey)
    case 'cohere':
      return cohere(modelName, apiKey)
    case 'deepinfra':
      return deepinfra(modelName, apiKey)
    case 'deepseek':
      return deepseek(modelName, apiKey)
    case 'groq':
      return groq(modelName, apiKey)
    case 'mistral':
      return mistral(modelName, apiKey)
    case 'perplexity':
      return perplexity(modelName, apiKey)
    case 'xai':
      return xai(modelName, apiKey)
    default:
      throw new Error(`Unsupported provider: ${provider}`)
  }
}

// Stream Model
export function streamLLMText({modelId, messages, parameters, apiKey}: ModelQueryProps) {
  
  const result = streamText({
    model: getModel(modelId, apiKey),
    messages,
    ...parameters
  });

  return result.toDataStreamResponse();
}

// Generate Model
export function generateLLMText({modelId, messages, parameters, apiKey}: ModelQueryProps) {
  const result = generateText({
    model: getModel(modelId, apiKey),
    messages,
    ...parameters
  });

  return result;
}

// Generate Embedding
export function generateLLMEmbedding({input}: ModelEmbeddingQueryProps) {
  const result = generateEmbedding(input);

  return result;
}