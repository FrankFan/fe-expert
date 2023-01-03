import React from 'react'
import './index.scss'

interface Props {
  title: string
  children: React.ReactNode
}

// 关于如何使用FC泛型定义props参考如下文章：
// https://www.carlrippon.com/Different-ways-to-strongly-type-function-component-props-with-typescript/
const Card: React.FC<Props> = ({ title, children }) => {
  return (
    <div className='mycard'>
      <div className='mycard-title'>{title}</div>
      <div className='mycard-body'>{children}</div>
    </div>
  )
}

export default Card
