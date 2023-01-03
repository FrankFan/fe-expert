import CustomLink from './CustomLink'
import './index.scss'

export const Egg = () => {
  return (
    <div className='container'>
      <div className='egg-head'>页面列表</div>
      <div className='egg-body'>
        <nav className='egg-body_nav'>
          <CustomLink to='/'>home</CustomLink>
          <CustomLink to='/egg'>egg</CustomLink>
        </nav>
      </div>
    </div>
  )
}
