import clsx from 'clsx'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { MessageModel } from '../../../../_metronic/helpers'
import { RootState } from '../../../../setup'
import { useAssetDraft } from '../../../context/AssetDraftContext'
import { useChatsList } from '../../../context/ChatsListContext'
import { getCurrentDateText, getCurrentTime, waitAndFormatTimestamp } from '../../../helpers/FormatDate'
import { addChatSession, clearSessions } from '../../../modules/chats'
import { getChatDetail, sendMessageChat } from '../../../services/chatService'
import { RouteParamsModel } from '../../shared/models/RouteParamsModel'
import { IQuestion } from '../models/QuestionModel'
import ChatExtras from './ChatExtras'
import ChatMessage from './ChatMessage'

const ChatBot: FC = () => {
    const isDrawer = true;
    const { setDraft } = useAssetDraft();
    const [message, setMessage] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const {user} = useSelector((state: RootState) => state.auth, shallowEqual);
    const userRef = useRef(user);
    const [messages, setMessages] = useState<MessageModel[]>([]);
    const messagesRef = useRef(messages);
    const [extraQuestions, setExtraQuestions] = useState<IQuestion[]>([]);
    const [extraInfo, setExtraInfo] = useState<IQuestion[]>([]);
    const [summary, setSummary] = useState('');
    const [chatSession, setChatSession] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    const { setOnClearRequested, loadChats } = useChatsList(); 
    const { id: currentSessionId } = useParams<RouteParamsModel>()
    const history = useHistory();
    const dispatch = useDispatch();
    const isMountedRef = useRef(true);
    const selector = useSelector((state: RootState) => state.chatSessions);

    const clearChat = useCallback(async () => {
        const clearInputs = async () => {
            if(!isMountedRef.current) return;
            setMessages([]);
            setMessage('');
            setChatSession(undefined);
            setExtraInfo([]);
            setExtraQuestions([]);
            setSummary('');
            if(!user)
                dispatch(clearSessions());
        }
        if(!userRef.current && messagesRef.current.length > 0) {
            try {
                const _response = await Swal.fire({
                    icon: 'error',
                    title: 'Are you sure?',
                    text: 'The conversation will be deleted',
                    showCancelButton: true,
                    confirmButtonText: 'Ok',
                    cancelButtonText: 'Cancel',
                    customClass: {
                        confirmButton: 'btn-danger text-white'
                    }
                });
                if(_response.isConfirmed)
                    clearInputs();
                return _response.isConfirmed;
            }
            catch {
                return false;
            }
        }
        clearInputs();
        return true;
    }, []);


    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    useEffect(() => {
        userRef.current = user;
    }, [user]);

    useEffect(() => {
       messagesRef.current = messages;
    }, [messages]);

    useEffect(() => {
        setOnClearRequested(clearChat);
    }, [setOnClearRequested])


    useEffect(() => {
        if(!user) {
            const _localSession = selector.session;
            console.log(_localSession);
            
            if(_localSession) {
                setChatSession(_localSession.chatSessionId);
                setMessages(_localSession.messages);
                setExtraInfo(_localSession.extraQuestions);
                setExtraQuestions(_localSession.additionalQuestions);
                setSummary(_localSession.summary);
                history.push(`/assets/chat/${_localSession.chatSessionId}`)
                scrollToBottom();
            }
            return;
        }

        if(!currentSessionId || currentSessionId === chatSession)
            return;


        setChatSession(currentSessionId);
        const fetchChatDetail = async () => {
            const response: any[] = await getChatDetail(currentSessionId);
            if(response.length === 0)
                return;
            for(const item of response) {
                const timestamp = await waitAndFormatTimestamp(item.timestamp);
                const outMessage: MessageModel = {
                    user: 1,
                    type: 'out',
                    text: item.questionText,
                    time: timestamp
                };
                const inMessage: MessageModel = {
                    user: 0,
                    type: 'in',
                    text: item.answerText,
                    time: timestamp,
                }
                setDraft({
                    category: item?.category,
                    attributes: item?.attributes,
                    summary: item?.summary,
                    lastAnswer: item?.lastAnswer,
                    lastQuestion: item?.lastQuestion
                });
                setMessages((prev) => [...prev, outMessage, inMessage])
            }
        };
        history.push(`/assets/chat/${currentSessionId}`)
        clearChat();
        fetchChatDetail();
    }, [currentSessionId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const OnQuestion = async (question: string) => await sendMessage(question)

    const sendMessage = async (customMessage?: string) => {
        const _msg = customMessage ?? message;
        if(!_msg.trim()) return;

        const newMessage: MessageModel = {
            user: 1,
            type: 'out',
            text: _msg.trim(),
            time: getCurrentTime()
        };
        setMessage('');
        setExtraInfo([]);
        setExtraQuestions([]);
        setSummary('');
        setMessages((prevs) => [...prevs, newMessage]);
        setLoading(true);
        try {
            if(!isMountedRef.current)
                return;
            const response = await sendMessageChat(_msg.trim(), chatSession);
            const { 
                chatSessionId,
                generalResponse,
                additionalQuestions,
                extraQuestions,
                category,
                attributes,
                summary 
            } = response;

            const recvMessage: MessageModel = {
                user: 0,
                type: 'in',
                text: generalResponse || "Excuse me! I couldn't get an answer right now..",
                time: getCurrentTime()
            };  

            setChatSession(chatSessionId);
            setMessages((prevs) => [...prevs, recvMessage]);
            if(user) {
                loadChats(); // it can be optimized!!
                setDraft({
                    category: category,
                    attributes: attributes,
                    summary: summary
                });
            }
            else {
                dispatch(addChatSession({
                    messages: [newMessage, recvMessage],
                    summary,
                    extraQuestions,
                    category,
                    attributes,
                    additionalQuestions,
                    chatSessionId
                }))
            }
            setExtraInfo(extraQuestions);
            setExtraQuestions(additionalQuestions);
            setSummary(summary);
            history.push(`/assets/chat/${chatSessionId}`)
        }
        catch (error) {
            if(!isMountedRef.current)
                return;
            const errMessage: MessageModel = {
                user: 0,
                type: 'in',
                text: 'Sorry, an error occurred while processing your request. Please try again later.',
                time: getCurrentTime()
            }; 
            setMessages((prevs) => [...prevs, errMessage]);
            setExtraInfo([]);
            setExtraQuestions([]);
            setSummary('');
        }
        finally {
            if(!isMountedRef.current)
                return;
            setLoading(false);
        }

    }

    const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 13 && e.shiftKey === false && !loading) {
            e.preventDefault()
            sendMessage()
        }
    }

    return (
        <div
            className='card-body d-flex flex-column h-100'
            id={isDrawer ? 'kt_drawer_chat_messenger_body' : 'kt_chat_messenger_body'}
        >
            <div className='card-header border-0 d-flex justify-content-center align-items-center'>
                <div className='text-center'>
                    <h5 className='mb-1 fs-2'>Welcome to Archeota</h5>
                    <span>{getCurrentDateText()}</span>
                </div>
            </div>

            <div className='flex-grow-1 mb-10'>
            { !!messages && messages.length > 0 ? (
                <div
                    className={clsx('scroll-y px-5 me-n5 pe-5')}
                    data-kt-element='messages'
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: true, lg: true}'
                    data-kt-scroll-max-height='auto'
                    data-kt-scroll-dependencies={
                    isDrawer
                        ? '#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer'
                        : '#kt_header, #kt_toolbar, #kt_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer'
                    }
                    data-kt-scroll-wrappers={
                    isDrawer ? '#kt_drawer_chat_messenger_body' : '#kt_content, #kt_chat_messenger_body'
                    }
                    data-kt-scroll-offset={isDrawer ? '0px' : '-2px'}
                >
                    <div>
                        {messages.map((msg, i) => 
                        <ChatMessage key={`message_${i}`} message={msg} isDrawer={isDrawer} userInfo={user} summary={summary} />
                        )}                   
                        <ChatExtras extraInfo={extraInfo} extraQuestions={extraQuestions} onQuestion={OnQuestion} />
                        <div ref={messagesEndRef}></div>
                    </div>
                </div>
                ) : (
                <div className='text-center fs-3 text-gray-600 mb-9'>{`What I can help with${(!!user ? ` , ${user.firstName}`:'')}?`}</div>
            )}
            </div>

            <div
            style={{borderRadius: '10px'}}
            className='card-footer pt-4 border border-gray-500 bg-light'
            id={isDrawer ? 'kt_drawer_chat_messenger_footer' : 'kt_chat_messenger_footer'}
            >
                <textarea
                    className='form-control form-control-flush mb-3 bg-light'
                    rows={1}
                    data-kt-element='input'
                    placeholder='Type a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={onEnterPress}
                />

                <div className='d-flex flex-stack'>
                    <div className='d-flex align-items-center me-2' />
                    <button
                        className={`btn btn-dark ${loading ? 'disabled' : ''}`}
                        type='button'
                        data-kt-element='send'
                        onClick={() => sendMessage()}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatBot;
