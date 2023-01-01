import React, { FC } from 'react'
import './index.scss'
interface FrameProps {
  children: any
  className?: string
}

const Frame: FC<FrameProps> = ({ children, className }) => {
  return <div className={`${className} frame`}>{children}</div>
}

export default Frame
