import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { RootState } from "../../setup";
import { useDispatch, useSelector } from "react-redux";
import { associateChats } from "../services/chatService";
import { clearSessions, LocalSession } from "../modules/chats";
import { useChatsList } from "./ChatsListContext";


interface ChatSessionsCtxType {
    syncing: boolean;
};

const ChatSessionsCtx = createContext<ChatSessionsCtxType | undefined>(undefined);

export const ChatSessionsCtxProvider: FC<{children: ReactNode}> = ({ children }) => {
    const dispatch = useDispatch();
    const [syncing, setSyncing] = useState(false);
    const [synced, setSynced] = useState(false);
    const { session } = useSelector((state: RootState) => state.chatSessions)
    const user = useSelector((state: RootState) => state.auth.user);
    const { loadChats: reloadChatList } = useChatsList();

    useEffect(() => {
        const syncChats = async () => {
            if(!user || !session || syncing || synced) {
                setSynced(true);
                return;
            }
            setSynced(false);
            setSyncing(true);
            try {
                await associateChats(session.chatSessionId);
                dispatch(clearSessions());
                reloadChatList();
            }
            finally {
                setSynced(true);
                setSyncing(false);
            }
        };
        syncChats();
    }, [user]);


    
    const value: ChatSessionsCtxType = {
        syncing
    };

    return ( 
        <ChatSessionsCtx.Provider value={value}>
            {children}
        </ChatSessionsCtx.Provider>
    )
};

export const useChatSessions = () => {
    const ctx = useContext(ChatSessionsCtx);
    if (!ctx) {
        throw new Error('useChatSessions debe usarse dentro de ChatSessionsCtxProvider')
    }
    return ctx
};