export interface Model {
  id: string;
  name: string;
  provider: string;
  costInput?: string;
  costOutput?: string;
  costPer1k?: number; // Cost in USD per 1000 tokens (approximate average)
  recommendedFor?: ('math' | 'coding' | 'playground')[];
}

export const PRESET_MODELS: Model[] = [
  { id: 'google/gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', provider: 'Google', recommendedFor: ['math', 'coding'], costPer1k: 0.0025 },
  { id: 'anthropic/claude-sonnet-4-6', name: 'Claude Sonnet 4.6', provider: 'Anthropic', recommendedFor: ['coding'], costPer1k: 0.009 },
  { id: 'qwen/qwen3.5-397b-a17b', name: 'Qwen 3.5', provider: 'Qwen', costPer1k: 0.004 },
  { id: 'openai/gpt-5.2', name: 'GPT-5.2', provider: 'OpenAI', recommendedFor: ['math', 'coding'], costPer1k: 0.015 },
  { id: 'google/gemini-3-flash-preview', name: 'Gemini 3 Flash', provider: 'Google', recommendedFor: ['playground'], costPer1k: 0.0002 },
  { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', recommendedFor: ['math'], costPer1k: 0.0013 },
  { id: 'anthropic/claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Anthropic', recommendedFor: ['coding'], costPer1k: 0.009 },
  { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'OpenAI', recommendedFor: ['playground'], costPer1k: 0.006 },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', recommendedFor: ['playground'], costPer1k: 0.0004 },
  { id: 'x-ai/grok-3', name: 'Grok 3', provider: 'xAI', recommendedFor: ['playground'], costPer1k: 0.005 },
  { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Llama 3.3', provider: 'Meta', recommendedFor: ['playground'], costPer1k: 0.0006 },
  { id: 'mistralai/mistral-large-2411', name: 'Mistral Large', provider: 'Mistral', costPer1k: 0.004 },
  { id: 'perplexity/sonar-pro', name: 'Sonar Pro', provider: 'Perplexity', costPer1k: 0.005 },
  { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google', costPer1k: 0.0002 },
  { id: 'minimax/minimax-01', name: 'MiniMax', provider: 'MiniMax', costPer1k: 0.001 },
  { id: 'qwen/qwen-max', name: 'Qwen Max', provider: 'Qwen', costPer1k: 0.006 },
  { id: 'microsoft/phi-4', name: 'Phi-4', provider: 'Microsoft', costPer1k: 0.0001 },
  { id: 'nvidia/llama-3.1-nemotron-70b-instruct', name: 'Nemotron', provider: 'NVIDIA', costPer1k: 0.0006 },
  { id: 'anthropic/claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', costPer1k: 0.009 },
  { id: 'openai/o1', name: 'OpenAI o1', provider: 'OpenAI', recommendedFor: ['math'], costPer1k: 0.045 },
  { id: 'openai/o3-mini', name: 'OpenAI o3 Mini', provider: 'OpenAI', recommendedFor: ['math'], costPer1k: 0.0015 },
  { id: 'google/gemini-2.0-flash-001', name: 'Gemini 2.0 Flash', provider: 'Google', costPer1k: 0.0002 },
  { id: 'deepseek/deepseek-chat', name: 'DeepSeek V3', provider: 'DeepSeek', costPer1k: 0.0003 },
  { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1', provider: 'Meta', costPer1k: 0.01 },
  { id: 'mistralai/codestral-2508', name: 'Codestral', provider: 'Mistral', recommendedFor: ['coding'], costPer1k: 0.001 },
  { id: 'qwen/qwen2.5-coder-32b-instruct', name: 'Qwen 2.5 Coder', provider: 'Qwen', recommendedFor: ['coding'], costPer1k: 0.0003 },
  { id: 'x-ai/grok-2', name: 'Grok 2', provider: 'xAI', costPer1k: 0.002 },
  { id: 'amazon/nova-pro-v1', name: 'Nova Pro', provider: 'Amazon', costPer1k: 0.0024 },
  { id: 'cohere/command-r-plus-08-2024', name: 'Command R+', provider: 'Cohere', costPer1k: 0.0075 },
  { id: 'ai21/jamba-large-1.7', name: 'Jamba Large', provider: 'AI21', costPer1k: 0.003 },
  { id: 'z-ai/glm-4-plus', name: 'GLM-4 Plus', provider: 'Z.AI', costPer1k: 0.0015 },
  { id: 'google/imagen-3.0-generate-001', name: 'Imagen 3', provider: 'Google', costPer1k: 0.04 },
  { id: 'black-forest-labs/flux.1-pro', name: 'FLUX.1 Pro', provider: 'BFL', costPer1k: 0.05 },
  { id: 'openai/dall-e-3', name: 'DALL-E 3', provider: 'OpenAI', costPer1k: 0.04 },
  { id: 'midjourney/midjourney-6', name: 'Midjourney 6', provider: 'Midjourney', costPer1k: 0.05 },
  { id: 'stabilityai/stable-diffusion-3-medium', name: 'SD3 Medium', provider: 'Stability', costPer1k: 0.03 },
  { id: 'runway/gen-3-alpha', name: 'Gen-3 Alpha', provider: 'Runway', costPer1k: 0.1 },
  { id: 'luma/dream-machine', name: 'Dream Machine', provider: 'Luma', costPer1k: 0.1 },
  { id: 'kling/kling-1.5', name: 'Kling 1.5', provider: 'Kling', costPer1k: 0.1 },
  { id: 'google/veo', name: 'Veo', provider: 'Google', costPer1k: 0.1 },
  { id: 'openai/sora', name: 'Sora', provider: 'OpenAI', costPer1k: 0.1 }
];
