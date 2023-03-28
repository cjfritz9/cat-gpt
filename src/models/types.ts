export type ChatState = 'start chat' | 'conversation';

export type Roles = 'system' | 'user' | 'assistant';

export type ChatRequest = [
  { role: Roles; content: string },
  { role: 'user'; content: string }
];
