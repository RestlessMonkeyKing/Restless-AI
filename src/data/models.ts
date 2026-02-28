export interface Model {
  id: string;
  name: string;
  provider: string;
  costInput?: string;
  costOutput?: string;
}

export const PRESET_MODELS: Model[] = [
  { id: 'google/gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', provider: 'Google' },
  { id: 'anthropic/claude-sonnet-4-6', name: 'Claude Sonnet 4.6', provider: 'Anthropic' },
  { id: 'qwen/qwen3.5-397b-a17b', name: 'Qwen 3.5', provider: 'Qwen' },
  { id: 'openai/gpt-5.2', name: 'GPT-5.2', provider: 'OpenAI' },
  { id: 'google/gemini-3-flash-preview', name: 'Gemini 3 Flash', provider: 'Google' },
  { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek' },
  { id: 'anthropic/claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Anthropic' },
  { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI' },
  { id: 'x-ai/grok-3', name: 'Grok 3', provider: 'xAI' },
  { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Llama 3.3', provider: 'Meta' },
  { id: 'mistralai/mistral-large-2411', name: 'Mistral Large', provider: 'Mistral' },
  { id: 'perplexity/sonar-pro', name: 'Sonar Pro', provider: 'Perplexity' },
  { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google' },
  { id: 'minimax/minimax-01', name: 'MiniMax', provider: 'MiniMax' },
  { id: 'qwen/qwen-max', name: 'Qwen Max', provider: 'Qwen' },
  { id: 'microsoft/phi-4', name: 'Phi-4', provider: 'Microsoft' },
  { id: 'nvidia/llama-3.1-nemotron-70b-instruct', name: 'Nemotron', provider: 'NVIDIA' },
  { id: 'anthropic/claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
  { id: 'openai/o1', name: 'OpenAI o1', provider: 'OpenAI' },
  { id: 'openai/o3-mini', name: 'OpenAI o3 Mini', provider: 'OpenAI' },
  { id: 'google/gemini-2.0-flash-001', name: 'Gemini 2.0 Flash', provider: 'Google' },
  { id: 'deepseek/deepseek-chat', name: 'DeepSeek V3', provider: 'DeepSeek' },
  { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1', provider: 'Meta' },
  { id: 'mistralai/codestral-2508', name: 'Codestral', provider: 'Mistral' },
  { id: 'qwen/qwen2.5-coder-32b-instruct', name: 'Qwen 2.5 Coder', provider: 'Qwen' },
  { id: 'x-ai/grok-2', name: 'Grok 2', provider: 'xAI' },
  { id: 'amazon/nova-pro-v1', name: 'Nova Pro', provider: 'Amazon' },
  { id: 'cohere/command-r-plus-08-2024', name: 'Command R+', provider: 'Cohere' },
  { id: 'ai21/jamba-large-1.7', name: 'Jamba Large', provider: 'AI21' },
  { id: 'z-ai/glm-4-plus', name: 'GLM-4 Plus', provider: 'Z.AI' },
  { id: 'google/imagen-3.0-generate-001', name: 'Imagen 3', provider: 'Google' },
  { id: 'black-forest-labs/flux.1-pro', name: 'FLUX.1 Pro', provider: 'BFL' },
  { id: 'openai/dall-e-3', name: 'DALL-E 3', provider: 'OpenAI' },
  { id: 'midjourney/midjourney-6', name: 'Midjourney 6', provider: 'Midjourney' },
  { id: 'stabilityai/stable-diffusion-3-medium', name: 'SD3 Medium', provider: 'Stability' },
  { id: 'runway/gen-3-alpha', name: 'Gen-3 Alpha', provider: 'Runway' },
  { id: 'luma/dream-machine', name: 'Dream Machine', provider: 'Luma' },
  { id: 'kling/kling-1.5', name: 'Kling 1.5', provider: 'Kling' },
  { id: 'google/veo', name: 'Veo', provider: 'Google' },
  { id: 'openai/sora', name: 'Sora', provider: 'OpenAI' }
];
