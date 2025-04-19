export type Provider = 'deepseek' | 'gemini'

export const providers: Array<{ label: string, value: Provider}> = [
  { label: 'Gemini', value: 'gemini' },
  { label: 'DeepSeek', value: 'deepseek' },
]