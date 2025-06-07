import { useState, useEffect } from 'react';
import { getChatHistory } from '../../services/chatService';
import { HistoryChatModel } from '../../../_metronic/layout/components/aside/models/HistoryChatModel';


export const useAllHistoryChats = (reloadFlag: boolean) => {
  const [chats, setChats] = useState<HistoryChatModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchHistoryChats = async () => {
      try {
        setLoading(true);
        const data = await getChatHistory();
        if (isMounted) {
          setChats(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchHistoryChats()
    return () => {
      isMounted = false;
    };
  }, [reloadFlag]);

  return { chats, loading, error };
};
