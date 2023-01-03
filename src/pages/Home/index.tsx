import Frame from '@/components/Frame'
import Loading from '@/components/Loading'
import CustomLink from './CustomLink'
import './index.scss'
import { Button } from 'antd-mobile'
import { useState } from 'react'
import Card from '@/components/Card'

export const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
      <Card title='HelloWorld'>
        <button type='button' onClick={() => setCount((count) => count + 1)}>
          click button
        </button>
        <span>count is: {count}</span>
      </Card>
    </div>
  )
}
