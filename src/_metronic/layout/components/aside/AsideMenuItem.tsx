import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {checkIsActive, KTSVG} from '../../../helpers'
import {useLayout} from '../../core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasBullet?: boolean
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
  onClick,
  className
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {aside} = config
  const titleRef = useRef<HTMLSpanElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)


  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const handleMouseEnter = () => {
    const el = titleRef.current
    if (el && el.scrollWidth > el.clientWidth) {
      setShowTooltip(true)
    } else {
      setShowTooltip(false)
    }
  }


  const handleMouseLeave = () => setShowTooltip(false)

  return (
    <div className='menu-item'>
      <Link
        className={clsx('menu-link without-sub', {active: isActive}, className)}
        to={to}
        onClick={handleClick}
      >
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span
          className='menu-title text-truncate'
          style={{
            maxWidth: 160,
            display: 'inline-block',
            verticalAlign: 'middle',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          ref={titleRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {title}
        </span>
        {showTooltip && (
          <div
            style={{
              position: 'fixed',
              background: '#222',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: 6,
              top: titleRef.current?.getBoundingClientRect().top ?? 0,
              left: (titleRef.current?.getBoundingClientRect().right ?? 0) + 10,
              zIndex: 9999,
              fontSize: 14,
              pointerEvents: 'none'
            }}
          >
            {title}
          </div>
        )}
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
