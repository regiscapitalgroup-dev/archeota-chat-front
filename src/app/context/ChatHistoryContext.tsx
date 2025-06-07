// contexts/ChatHistoryContext.tsx
import React, {createContext, useContext, useRef, useCallback, ReactNode, useState} from 'react'

interface ChatHistoryContextType {
  setOnNewChatRequested: (callback: () => void) => void
  triggerNewChat: () => void
  forceReload: () => void
  reloadFlag: boolean;
}

const ChatHistoryContext = createContext<ChatHistoryContextType | undefined>(undefined)

export const ChatHistoryProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const callbackRef = useRef<(() => void) | null>(null)
  const [reloadFlag, setReloadFlag] = useState(false) 

  const forceReload = useCallback(() => {
    setReloadFlag(true)
  }, [])

  const setOnNewChatRequested = useCallback((callback: () => void) => {
    callbackRef.current = callback
  }, [])

  const triggerNewChat = useCallback(() => {
    if (callbackRef.current) callbackRef.current()
  }, [])

  const value: ChatHistoryContextType = {
    setOnNewChatRequested,
    triggerNewChat,
    forceReload,
    reloadFlag
  }

  return <ChatHistoryContext.Provider value={value}>{children}</ChatHistoryContext.Provider>
}

export const useChatHistory = () => {
  const context = useContext(ChatHistoryContext)
  if (!context) {
    throw new Error('useChatHistory debe usarse dentro de ChatHistoryProvider')
  }
  return context
}
