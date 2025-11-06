import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { ChatExtrasModel } from '../models/ChatExtrasModel'
import { ChatMessageModel } from '../models/ChatMessageModel'
import ChatExtras from './ChatExtras'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import WaitingMessage from './WaitingMessage'
import { getCurrentTime } from '../../../helpers/FormatDate'
import { sendMessageChat } from '../../../services/chatService'


type Props = {
    loading: boolean;
    sending: boolean;
    onSubmit: (value: string) => void;
};

const ChatWrapper: FC<Props> = () => {
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [sending, setSending] = useState(false);
    const [messages, setMessages] = useState<ChatMessageModel[]>([]);
    const [extras, setExtras] = useState<ChatExtrasModel|null>(null);
    const isMountedRef = useRef(false);

    const scrollToBottom = () => {
        setImmediate(() => {
            if(!messagesContainerRef.current)
                return;
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior: 'smooth',
            });
        })
    }

    const _handlerMessagesAndExtras = useCallback(async (messages: ChatMessageModel[] = [], extras?: ChatExtrasModel, animate: boolean = true) => {
        try {
            if(!isMountedRef.current)
                return;
            setExtras(null);
            if(messages.length > 0) {
                if(!animate) {
                    setMessages(prev => [...prev, ...messages.map(m => ({...m, animate}))])
                    if(!extras)
                        scrollToBottom();
                }
                else
                    for (const m of messages) {
                        await new Promise<void>((res, rej) => {
                            setTimeout(() => {
                                if(isMountedRef.current) {
                                    setMessages((prev) => [...prev, { ...m, animate }])
                                    res();
                                }
                                else
                                    return rej();
                            }, 200);
                        });
                        scrollToBottom();
                    }
            }

            if(!!extras){
                if(!isMountedRef.current)
                    return;
                setExtras(extras);
                scrollToBottom();
            }
        }
        finally {
            
        }
    }, [isMountedRef]);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
             isMountedRef.current = false;
        }
    }, []);

    // useEffect(() => {
    //     _handlerMessagesAndExtras(prevMessages, prevExtras, prevMessages.length < 20);
    // },[prevMessages]);

    // useEffect(() => {
    //     if(sending)
    //         scrollToBottom();
    // }, [sending]);

    // useEffect(() => {
    //     if(!prevExtras)
    //         setExtras(null);
    // }, [prevExtras]);


    const sendMessage = async (message: string) => {
        message = message.trim();
        if(!message)
            return;
        const newMessage: ChatMessageModel = {
            animate: true,
            text: message,
            time: getCurrentTime(),
            type: 'in'
        };
        _handlerMessagesAndExtras([newMessage]);
        setExtras(null);
        setSending(true);
        try {
            if(!isMountedRef.current)
                return;
            const response = await sendMessageChat(message);
            const { 
                chatSessionId,
                generalResponse,
                additionalQuestions,
                extraQuestions,
                category,
                attributes,
                summary 
            } = response;

            const recvMessage: ChatMessageModel = {
                animate: true,
                type: 'out',
                text: generalResponse || "Excuse me! I couldn't get an answer right now..",
                time: getCurrentTime()
            };  
            _handlerMessagesAndExtras([recvMessage], {
                animate: true,
                content: summary,
                questions: additionalQuestions.map((e: {question:string}) => e.question),
                summary: extraQuestions.map((e: {question:string}) => e.question)
            })
        }
        catch {
            if(!isMountedRef.current)
                return;
            const errMessage: ChatMessageModel = {
                animate: true,
                type: 'in',
                text: 'Sorry, an error occurred while processing your request. Please try again later.',
                time: getCurrentTime()
            };
            _handlerMessagesAndExtras([errMessage]);
            setExtras(null);
        }
        finally {
            if(!isMountedRef.current)
                return;
            setSending(false);
        }
        
    };
    
    // const { setOnClearRequested, loadChats } = useChatsList(); 
    // const { id: currentSessionId } = useParams<RouteParamsModel>()
    // const history = useHistory();

    // const clearChat = useCallback(async () => {
    //     const clearInputs = async () => {
    //         if(!isMountedRef.current) return;
    //         setMessages([]);
    //         setMessage('');
    //         setChatSession(undefined);
    //         setExtraInfo([]);
    //         setExtraQuestions([]);
    //         setSummary('');
    //     }
    //     if(!userRef.current && messagesRef.current.length > 0) {
    //         try {
    //             const _response = await Swal.fire({
    //                 icon: 'error',
    //                 title: 'Are you sure?',
    //                 text: 'The conversation will be deleted',
    //                 showCancelButton: true,
    //                 confirmButtonText: 'Ok',
    //                 cancelButtonText: 'Cancel',
    //                 customClass: {
    //                     confirmButton: 'btn-danger text-white'
    //                 }
    //             });
    //             if(_response.isConfirmed)
    //                 clearInputs();
    //             return _response.isConfirmed;
    //         }
    //         catch {
    //             return false;
    //         }
    //     }
    //     clearInputs();
    //     return true;
    // }, []);

    // useEffect(() => {
    //     return () => {
    //         isMountedRef.current = false;
    //     }
    // }, []);

    // useEffect(() => {
    //     userRef.current = user;
    // }, [user]);

    // useEffect(() => {
    //    messagesRef.current = messages;
    //    scrollToBottom();
    // }, [messages]);

    // useEffect(() => {
    //     setOnClearRequested(clearChat);
    // }, [setOnClearRequested])

    // useEffect(() => {
    //     if(!user || !currentSessionId || currentSessionId === chatSession)
    //         return;

    //     setChatSession(currentSessionId);
    //     const fetchChatDetail = async () => {
    //         const response: any[] = await getChatDetail(currentSessionId);
    //         if(response.length === 0)
    //             return;
    //         for(const item of response) {
    //             const timestamp = await waitAndFormatTimestamp(item.timestamp);
    //             const outMessage: MessageModel = {
    //                 user: 1,
    //                 type: 'out',
    //                 text: item.questionText,
    //                 time: timestamp
    //             };
    //             const inMessage: MessageModel = {
    //                 user: 0,
    //                 type: 'in',
    //                 text: item.answerText,
    //                 time: timestamp,
    //             }
    //             setDraft({
    //                 category: item?.category,
    //                 attributes: item?.attributes,
    //                 summary: item?.summary,
    //                 lastAnswer: item?.lastAnswer,
    //                 lastQuestion: item?.lastQuestion
    //             });
    //             setMessages((prev) => [...prev, outMessage, inMessage])
    //         }
    //     };
    //     history.push(`/assets/chat/${currentSessionId}`)
    //     clearChat();
    //     fetchChatDetail();
    // }, [currentSessionId]);

    // const _handleAddMessages = (message: MessageModel[], animate: boolean = true) => {

    // }

    // const OnQuestion = async (question: string) => await sendMessage(question)

    // const sendMessage = async (customMessage?: string) => {
    //     const _msg = customMessage ?? message;
    //     if(!_msg.trim()) return;

    //     const newMessage: MessageModel = {
    //         user: 1,
    //         type: 'out',
    //         text: _msg.trim(),
    //         time: getCurrentTime()
    //     };
    //     setMessage('');
    //     setExtraInfo([]);
    //     setExtraQuestions([]);
    //     setSummary('');
    //     setMessages((prevs) => [...prevs, newMessage]);
    //     setLoading(true);
    //     try {
    //         if(!isMountedRef.current)
    //             return;
    //         const response = await sendMessageChat(_msg.trim(), chatSession);
    //         const { 
    //             chatSessionId,
    //             generalResponse,
    //             additionalQuestions,
    //             extraQuestions,
    //             category,
    //             attributes,
    //             summary 
    //         } = response;

    //         const recvMessage: MessageModel = {
    //             user: 0,
    //             type: 'in',
    //             text: generalResponse || "Excuse me! I couldn't get an answer right now..",
    //             time: getCurrentTime()
    //         };  

    //         setChatSession(chatSessionId);
    //         setMessages((prevs) => [...prevs, recvMessage]);
    //         if(user) {
    //             loadChats(); // it can be optimized!!
    //             setDraft({
    //                 category: category,
    //                 attributes: attributes,
    //                 summary: summary
    //             });
    //         }
    //         setExtraInfo(additionalQuestions);
    //         setExtraQuestions(extraQuestions);
    //         setSummary(summary);
    //         history.push(`/assets/chat/${chatSessionId}`)
    //     }
    //     catch (error) {
    //         if(!isMountedRef.current)
    //             return;
    //         const errMessage: MessageModel = {
    //             user: 0,
    //             type: 'in',
    //             text: 'Sorry, an error occurred while processing your request. Please try again later.',
    //             time: getCurrentTime()
    //         }; 
    //         setMessages((prevs) => [...prevs, errMessage]);
    //         setExtraInfo([]);
    //         setExtraQuestions([]);
    //         setSummary('');
    //     }
    //     finally {
    //         if(!isMountedRef.current)
    //             return;
    //         setLoading(false);
    //     }

    // }

    // const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    //     if (e.keyCode === 13 && e.shiftKey === false && !loading) {
    //         e.preventDefault()
    //         sendMessage()
    //     }
    // }
    
    

    return (
        <>
            <div className='chat-wrapper'>
                <div className="chat-messages" ref={messagesContainerRef}>
                    { messages.map((message, i) => (
                        <ChatMessage 
                            key={i}
                            animate={message.animate} 
                            message={{ 
                                time: message.time,
                                type: message.type,
                                user: 0,
                                text: message.text 
                            }}
                        />
                    ))}
                    { extras &&
                        <ChatExtras 
                            content={extras.content} 
                            animate={extras.animate} 
                            questions={extras.questions} 
                            summary={extras.summary}
                            clickQuestion={sendMessage}
                        />
                    }
                    {sending && <WaitingMessage animate={true}/>}
                </div>
                <div className="chat-inputs">
                    <ChatInput loading={sending} onSend={sendMessage} />
                </div>
            </div>
        </>
    )
}

export default ChatWrapper;
