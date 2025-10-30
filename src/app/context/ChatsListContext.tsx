import React, { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { HistoryChatModel } from "../../_metronic/layout/components/aside/models/HistoryChatModel";
import { getChatHistory } from "../services/chatService";

interface ChatsListCtxType {
  addMessage: (message: HistoryChatModel) => void;
  setMessages: (messages: HistoryChatModel[]) => void;
  chats: HistoryChatModel[];
  error: Error | null;
  setOnClearRequested: (cb: () => Promise<boolean>) => void;
  triggerClear: () => Promise<boolean>;
  loadChats: () => Promise<void>; 
}

const ChatsListCtx = createContext<ChatsListCtxType | undefined>(undefined);

export const ChatsListCtxProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const clearCallbackRef = useRef<(() => Promise<boolean>) | null>(null)
    const [chats, setLists] = useState<HistoryChatModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const isMountedRef = useRef(true);

    useEffect(() => {
      return () => {
        isMountedRef.current = false;
      }
    }, []);

    const loadChats = async () => {
      if(!loading && isMountedRef.current) {
        try {
          setLoading(true);
          const data = await getChatHistory();
          setLists(data);
        }
        catch(err) {
            setError(err as Error);
        }
        finally {
          setLoading(false);
        }
      }
    };
    
    const setOnClearRequested = useCallback((callback: () => Promise<boolean>) => {
      clearCallbackRef.current = callback
    }, [])

    const triggerClear = useCallback(async () => {
      if (clearCallbackRef.current) {
        return clearCallbackRef.current()
      }
      return false;
    }, [])

    const addMessage = (msg: HistoryChatModel) => {
      if(!chats.find(msg => msg.sessionId == msg.sessionId))
        setLists((prev) => [...prev, msg]);
    }

    const setMessages = (msgs: HistoryChatModel[]) => {
      setLists(msgs);
    };

    const value: ChatsListCtxType = {
      addMessage,
      setMessages,
      loadChats,
      error,
      chats,
      setOnClearRequested,
      triggerClear
    };

    return <ChatsListCtx.Provider value={value}>{children}</ChatsListCtx.Provider>
};

export const useChatsList = () => {
  const ctx = useContext(ChatsListCtx);
  if (!ctx) {
    throw new Error('useChatsList debe usarse dentro de ChatsListCtxProvider')
  }
  return ctx
}