export interface LoginRegisterProps {
  setFormState: (state: 'login' | 'register') => void;
}

export interface ChatWindowProps {
  setWindowState: (state: 'start chat' | 'conversation') => void;
  windowState?: 'start chat' | 'conversation';
}