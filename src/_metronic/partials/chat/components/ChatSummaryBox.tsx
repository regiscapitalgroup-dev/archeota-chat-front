import React from 'react'

interface ChatSummaryBoxProps {
  text: string
}

const ChatSummaryBox = ({text}: ChatSummaryBoxProps) => (
  <div
    className='alert alert-dismissible bg-white d-flex flex-column p-5 mb-8 shadow-sm border-0 position-relative'
    style={{
      maxHeight: 120,
      minHeight: 80,
      overflowY: 'auto',
      borderRadius: 13,
      border: '1.5px solid #e3e8ef',
      boxShadow: '0 4px 32px 0 rgba(44,62,80,0.07)', 
      backdropFilter: 'blur(1.5px)', 
      WebkitBackdropFilter: 'blur(1.5px)'
    }}
    role='alert'
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 16,
        right: 16,
        height: 3,
        borderRadius: 2,
        background: 'linear-gradient(90deg,#bfc8ff 0%,#f5f8ff 100%)',
        opacity: 0.18
      }}
    />
    <div
      className='fs-7'
      style={{
        color: '#3a4252',
        fontWeight: 500,
        letterSpacing: 0.04,
        whiteSpace: 'pre-line'
      }}
      dangerouslySetInnerHTML={{__html: text}}
    />
  </div>
)

export default ChatSummaryBox
