import Frame from '@/components/Frame'
import Loading from '@/components/Loading'
import CustomLink from './CustomLink'
import './index.scss'
import { Button } from 'antd-mobile'
import { useState } from 'react'

const Home = () => {
  return (
    <div className='container'>
      <div className='home-head'>页面列表</div>
      <div className='home-body'>
        <nav className='home-body_nav'>
          <CustomLink to='/'>首页</CustomLink>
          <CustomLink to='/'>活动介绍页</CustomLink>
          <CustomLink to='/predict'>预测页</CustomLink>
          <CustomLink to='/preorder'>预下单页</CustomLink>
          <CustomLink to='/myPredict'>我的预测页</CustomLink>
        </nav>
      </div>
      <div className='home-foot'>
        <Frame className='test-block'>
          <div style={{ padding: '20px' }}>
            <h2>我是边框渐变的容器</h2>
            <h1>我是边框渐变的容器</h1>
          </div>
        </Frame>
      </div>
    </div>
  )
}

export default Home
