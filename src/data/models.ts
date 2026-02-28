export interface Model {
  id: string;
  name: string;
  provider: string;
  costInput?: string;
  costOutput?: string;
}

export const PRESET_MODELS: Model[] = [
  { id: 'google/gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', provider: 'Google', costInput: '$2/M', costOutput: '$12/M' },
  { id: 'anthropic/claude-sonnet-4-6', name: 'Claude Sonnet 4.6', provider: 'Anthropic', costInput: '$3/M', costOutput: '$15/M' },
  { id: 'qwen/qwen3.5-397b-a17b', name: 'Qwen3.5 397B', provider: 'Qwen', costInput: '$0.15/M', costOutput: '$1/M' },
  { id: 'openai/gpt-5.2', name: 'GPT-5.2', provider: 'OpenAI', costInput: '$1.75/M', costOutput: '$14/M' },
  { id: 'google/gemini-3-flash-preview', name: 'Gemini 3 Flash', provider: 'Google', costInput: '$0.5/M', costOutput: '$3/M' },
  { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', costInput: '$0.7/M', costOutput: '$2.5/M' },
  { id: 'anthropic/claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', provider: 'Anthropic', costInput: '$3/M', costOutput: '$15/M' },
  { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'OpenAI', costInput: '$2.5/M', costOutput: '$10/M' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', costInput: '$0.15/M', costOutput: '$0.6/M' },
  { id: 'x-ai/grok-3', name: 'Grok 3', provider: 'xAI', costInput: '$3/M', costOutput: '$15/M' },
  { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Llama 3.3 70B', provider: 'Meta', costInput: '$0.1/M', costOutput: '$0.32/M' },
  { id: 'mistralai/mistral-large-2411', name: 'Mistral Large 2', provider: 'Mistral', costInput: '$2/M', costOutput: '$6/M' },
  { id: 'perplexity/sonar-pro', name: 'Sonar Pro', provider: 'Perplexity', costInput: '$3/M', costOutput: '$15/M' },
  { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google', costInput: '$0.3/M', costOutput: '$2.5/M' },
  { id: 'minimax/minimax-01', name: 'MiniMax-01', provider: 'MiniMax', costInput: '$0.2/M', costOutput: '$1.1/M' },
  { id: 'qwen/qwen-max', name: 'Qwen Max', provider: 'Qwen', costInput: '$1.6/M', costOutput: '$6.4/M' },
  { id: 'microsoft/phi-4', name: 'Phi-4', provider: 'Microsoft', costInput: '$0.06/M', costOutput: '$0.14/M' },
  { id: 'nvidia/llama-3.1-nemotron-70b-instruct', name: 'Nemotron 70B', provider: 'NVIDIA', costInput: '$1.2/M', costOutput: '$1.2/M' },
  { id: 'anthropic/claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', costInput: '$3/M', costOutput: '$15/M' },
  { id: 'openai/o1', name: 'OpenAI o1', provider: 'OpenAI', costInput: '$15/M', costOutput: '$60/M' },
  { id: 'openai/o3-mini', name: 'OpenAI o3 Mini', provider: 'OpenAI', costInput: '$1.1/M', costOutput: '$4.4/M' },
  { id: 'google/gemini-2.0-flash-001', name: 'Gemini 2.0 Flash', provider: 'Google', costInput: '$0.1/M', costOutput: '$0.4/M' },
  { id: 'deepseek/deepseek-chat', name: 'DeepSeek V3', provider: 'DeepSeek', costInput: '$0.14/M', costOutput: '$0.28/M' },
  { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B', provider: 'Meta', costInput: '$4/M', costOutput: '$4/M' },
  { id: 'mistralai/codestral-2508', name: 'Codestral', provider: 'Mistral', costInput: '$0.3/M', costOutput: '$0.9/M' },
  { id: 'qwen/qwen2.5-coder-32b-instruct', name: 'Qwen 2.5 Coder 32B', provider: 'Qwen', costInput: '$0.2/M', costOutput: '$0.2/M' },
  { id: 'x-ai/grok-2', name: 'Grok 2', provider: 'xAI', costInput: '$2/M', costOutput: '$10/M' },
  { id: 'amazon/nova-pro-v1', name: 'Nova Pro', provider: 'Amazon', costInput: '$0.8/M', costOutput: '$3.2/M' },
  { id: 'cohere/command-r-plus-08-2024', name: 'Command R+', provider: 'Cohere', costInput: '$2.5/M', costOutput: '$10/M' },
  { id: 'ai21/jamba-large-1.7', name: 'Jamba Large 1.7', provider: 'AI21', costInput: '$2/M', costOutput: '$8/M' },
  { id: 'z-ai/glm-4-plus', name: 'GLM-4 Plus', provider: 'Z.AI', costInput: '$1.4/M', costOutput: '$1.4/M' },
  { id: 'google/imagen-3.0-generate-001', name: 'Imagen 3', provider: 'Google', costInput: '$0.04/img', costOutput: '' },
  { id: 'black-forest-labs/flux.1-pro', name: 'FLUX.1 Pro', provider: 'BFL', costInput: '$0.05/img', costOutput: '' },
  { id: 'openai/dall-e-3', name: 'DALL-E 3', provider: 'OpenAI', costInput: '$0.04/img', costOutput: '' },
  { id: 'midjourney/midjourney-6', name: 'Midjourney 6', provider: 'Midjourney', costInput: '', costOutput: '' },
  { id: 'stabilityai/stable-diffusion-3-medium', name: 'SD3 Medium', provider: 'Stability', costInput: '$0.002/img', costOutput: '' },
  { id: 'runway/gen-3-alpha', name: 'Gen-3 Alpha', provider: 'Runway', costInput: '', costOutput: '' },
  { id: 'luma/dream-machine', name: 'Dream Machine', provider: 'Luma', costInput: '', costOutput: '' },
  { id: 'kling/kling-1.5', name: 'Kling 1.5', provider: 'Kling', costInput: '', costOutput: '' },
  { id: 'google/veo', name: 'Veo', provider: 'Google', costInput: '', costOutput: '' },
  { id: 'openai/sora', name: 'Sora', provider: 'OpenAI', costInput: '', costOutput: '' }
];
