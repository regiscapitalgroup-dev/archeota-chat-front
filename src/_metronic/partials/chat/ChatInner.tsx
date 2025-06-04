/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState, useRef, useEffect, useCallback} from 'react'
import clsx from 'clsx'
import {toAbsoluteUrl, defaultUserInfos, MessageModel, UserInfoModel} from '../../helpers'
import {sendMessageChat} from '../../../app/services/chatService'
import {shallowEqual, useSelector} from 'react-redux'
import {RootState} from '../../../setup'
import {useChatHistory} from '../../../app/context/ChatHistoryContext'

type Props = {
  isDrawer?: boolean
}

const ChatInner: FC<Props> = ({isDrawer = false}) => {
  const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<MessageModel[]>([])
  const [userInfos, setUserInfos] = useState<UserInfoModel[]>(defaultUserInfos)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const {user} = useSelector((state: RootState) => state.auth, shallowEqual)
  const [userLogger, setUserLogger] = useState<string>('')

  const {setOnNewChatRequested} = useChatHistory()

  const handleNewChatRequest = useCallback(() => {
    console.log('ChatInner: Recibida petición de nuevo chat - limpiando mensajes')
    setMessages([])
    setMessage('')
  }, [])

  useEffect(() => {
    setOnNewChatRequested(handleNewChatRequest)
  }, [setOnNewChatRequested, handleNewChatRequest])

  useEffect(() => {
    if (user) setUserLogger(user?.firstName)
  }, [user])

  useEffect(() => {
    const updatedUserInfos = [...userInfos]
    updatedUserInfos[1].first_name = userLogger || 'User'
    setUserInfos(updatedUserInfos)
  }, [userLogger])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
  }

  const sendMessage = async () => {
    if (!message.trim()) return

    const newMessage: MessageModel = {
      user: 1,
      type: 'out',
      text: message,
      time: getCurrentTime(),
    }

    setMessages((prevMessages) => [...prevMessages, newMessage])
    toggleChatUpdateFlat(!chatUpdateFlag)
    setMessage('')
    setLoading(!loading)

    try {
      const response = await sendMessageChat(message)

      const serviceResponse: MessageModel = {
        user: 0,
        type: 'in',
        text: response.answer || "Excuse me! I couldn't get an answer right now..",
        time: getCurrentTime(),
      }

      setMessages((prevMessages) => [...prevMessages, serviceResponse])
    } catch (error) {
      console.error('Error al obtener respuesta:', error)
      const errorMessage: MessageModel = {
        user: 0,
        type: 'in',
        text: 'Sorry, an error occurred while processing your request. Please try again later.',
        time: getCurrentTime(),
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getCurrentDate = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return now.toLocaleDateString('en-EN', options)
  }

  const welcomeMessage = `What I can help with, ${userLogger}?`

  return (
    <div
      className='card-body'
      style={{height: '100%'}}
      id={isDrawer ? 'kt_drawer_chat_messenger_body' : 'kt_chat_messenger_body'}
    >
      <div className='card-header border-0 d-flex justify-content-center align-items-center'>
        <div className='text-center'>
          <h5 className='mb-1 fs-2'>Welcome to Archeota</h5>
          <span>{getCurrentDate()}</span>
        </div>
      </div>

      {messages && messages.length > 0 ? (
        <div
          className={clsx('scroll-y me-n5 pe-5', {'h-300px h-lg-auto': !isDrawer})}
          data-kt-element='messages'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
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
          {messages.map((message, index) => {
            const userInfo = userInfos[message.user]
            const state = message.type === 'in' ? 'info' : 'primary'
            const templateAttr = {}
            if (message.template) {
              Object.defineProperty(templateAttr, 'data-kt-element', {
                value: `template-${message.type}`,
              })
            }
            const contentClass = `${isDrawer ? '' : 'd-flex'} justify-content-${
              message.type === 'in' ? 'start' : 'end'
            } mb-10`
            return (
              <div
                key={`message${index}`}
                className={clsx('d-flex', contentClass, 'mb-10', {'d-none': message.template})}
                {...templateAttr}
              >
                <div
                  className={clsx(
                    'd-flex flex-column align-items',
                    `align-items-${message.type === 'in' ? 'start' : 'end'}`
                  )}
                >
                  <div className='d-flex align-items-center mb-2'>
                    {message.type === 'in' ? (
                      <>
                        <div className='symbol  symbol-35px symbol-circle '>
                          <img alt='Pic' src={toAbsoluteUrl(`/media/${userInfo.avatar}`)} />
                        </div>
                        <div className='ms-3'>
                          <a
                            href='#'
                            className='fs-5 fw-bolder text-gray-900 text-hover-primary me-1'
                          >
                            {userInfo.first_name}
                          </a>
                          <span className='text-muted fs-7 mb-1'>{message.time}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className='me-3'>
                          <span className='text-muted fs-7 mb-1'>{message.time}</span>
                          <a
                            href='#'
                            className='fs-5 fw-bolder text-gray-900 text-hover-primary ms-1'
                          >
                            You
                          </a>
                        </div>
                        <div className='symbol  symbol-35px symbol-circle '>
                          <img alt='Pic' src={toAbsoluteUrl(`/media/${userInfo.avatar}`)} />
                        </div>
                      </>
                    )}
                  </div>

                  <div
                    className={clsx(
                      'p-5 rounded',
                      `bg-light-${state}`,
                      'text-dark fw-bold w-100',
                      `text-${message.type === 'in' ? 'start' : 'end'}`
                    )}
                    data-kt-element='message-text'
                    dangerouslySetInnerHTML={{__html: message.text}}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='text-center fs-3 text-gray-600 mb-9'>{welcomeMessage}</div>
      )}

      <div
        className='card-footer pt-4 border border-gray-500 '
        id={isDrawer ? 'kt_drawer_chat_messenger_footer' : 'kt_chat_messenger_footer'}
      >
        <textarea
          className='form-control form-control-flush mb-3'
          rows={1}
          data-kt-element='input'
          placeholder='Type a message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onEnterPress}
        ></textarea>

        <div className='d-flex flex-stack'>
          <div className='d-flex align-items-center me-2'></div>
          <button
            className={`btn btn-dark ${loading ? 'disabled' : ''}`}
            type='button'
            data-kt-element='send'
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
      <div ref={messagesEndRef}></div>
    </div>
  )
}

export {ChatInner}
