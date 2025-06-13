import React from 'react'

interface LoadingSpinnerProps {
  message?: string
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  className = '',
}) => {
  const defaultImage = `${process.env.PUBLIC_URL}/media/icons/duotune/archeota/icon-logo.svg`

  return (
    <div className={`text-center py-10 ${className}`}>
      <img
        src={defaultImage}
        alt='Loading Archeota'
        style={{width: '100px', height: 'auto'}}
        className='mb-4'
      />

      {/*  <span className='spinner-border text-primary' role='status' /> */}
      <p className='mt-3 text-muted fs-5'>{message}</p>
    </div>
  )
}

export default LoadingSpinner
