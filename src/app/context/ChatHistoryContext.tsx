// contexts/ChatHistoryContext.tsx
import React, { createContext, useContext, useRef, useCallback, ReactNode } from 'react';

interface ChatHistoryContextType {
  setOnNewChatRequested: (callback: () => void) => void;
  triggerNewChat: () => void;
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined);

export const ChatHistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const callbackRef = useRef<(() => void) | null>(null);

  const setOnNewChatRequested = useCallback((callback: () => void) => {
    /* console.log("Registrando nuevo callback"); */
    callbackRef.current = callback;
  }, []);

  const triggerNewChat = useCallback(() => {
    /* console.log("Disparando nuevo chat...", callbackRef.current); */
    if (callbackRef.current) {
      /* console.log("Ejecutando callback..."); */
      callbackRef.current();
    } else {
      console.warn("No hay callback registrado");
    }
  }, []);

  const value: ChatHistoryContextType = {
    setOnNewChatRequested,
    triggerNewChat
  };

  return (
    <ChatHistoryContext.Provider value={value}>
      {children}
    </ChatHistoryContext.Provider>
  );
};

export const useChatHistory = () => {
  const context = useContext(ChatHistoryContext);
  if (context === undefined) {
    throw new Error('useChatHistory debe ser usado dentro de un ChatHistoryProvider');
  }
  return context;
};