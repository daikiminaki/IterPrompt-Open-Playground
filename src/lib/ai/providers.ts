import { createOpenAI, } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createCohere } from "@ai-sdk/cohere";
import { createDeepInfra } from "@ai-sdk/deepinfra";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { createGroq } from "@ai-sdk/groq";
import { createPerplexity } from "@ai-sdk/perplexity";
import { createMistral } from "@ai-sdk/mistral";
import { createXai } from "@ai-sdk/xai";

export const openai = (modelName: string, apiKey: string) => {
  const openai = createOpenAI({
    apiKey: apiKey,
  });
  return openai(modelName);
};

export const anthropic = (modelName: string, apiKey: string) => {
  const anthropic = createAnthropic({
    apiKey: apiKey,
  });
  return anthropic(modelName);
};

export const cohere = (modelName: string, apiKey: string) => {
  const cohere = createCohere({
    apiKey: apiKey,
  });
  return cohere(modelName);
};

export const deepinfra = (modelName: string, apiKey: string) => {
  const deepinfra = createDeepInfra({
    apiKey: apiKey,
  });
  return deepinfra(modelName);
};

export const deepseek = (modelName: string, apiKey: string) => {
  const deepseek = createDeepSeek({
    apiKey: apiKey,
  });
  return deepseek(modelName);
};

export const groq = (modelName: string, apiKey: string) => {
  const groq = createGroq({
    apiKey: apiKey,
  });
  return groq(modelName);
};

export const mistral = (modelName: string, apiKey: string) => {
  const mistral = createMistral({
    apiKey: apiKey,
  });
  return mistral(modelName);
};

export const perplexity = (modelName: string, apiKey: string) => {
  const perplexity = createPerplexity({
    apiKey: apiKey,
  });
  return perplexity(modelName);
};

export const xai = (modelName: string, apiKey: string) => {
  const xai = createXai({
    apiKey: apiKey,
  });
  return xai(modelName);
};

