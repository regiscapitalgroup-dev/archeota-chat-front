import React from 'react'

interface AIResponseBoxProps {
  text: string
  maxHeight?: number
}

const AIResponseBox = ({ text, maxHeight = 150 }: AIResponseBoxProps) => (
  <div
    className="card card-flush border-0 shadow-sm mb-7 bg-light-info"
    style={{
      maxHeight,
      overflowY: "auto",
      boxShadow: '0 4px 18px 0 rgba(74,104,255,.07)',
      borderRadius: 13
    }}
  >
    <div className="card-body pt-4 pb-4 px-4">
      <div
        className="fs-7 text-gray-900"
        style={{
          whiteSpace: "pre-line",
          lineHeight: 1.7,
          fontWeight: 500
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  </div>
)

export default AIResponseBox
