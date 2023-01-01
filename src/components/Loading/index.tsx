import { SpinLoading } from 'antd-mobile'
import './index.scss'

export default function Loading() {
  return (
    <div className='loading-container'>
      <div className='spin-container'>
        <SpinLoading style={{ '--size': '35px' }} />
      </div>
      <div>loading...</div>
    </div>
  )
}
