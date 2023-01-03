import { NavLink } from 'react-router-dom'
import { routes } from '@/routes'
import './index.scss'

export function Header() {
  return (
    <div className='my-header'>
      <div className='name'>
        <NavLink className='nav_item' to='/' end>
          REACT APP
        </NavLink>
      </div>
      <div className='nav'>
        {routes.map((route, index) => {
          return (
            <NavLink className='nav_item' key={index} to={route.path}>
              {route.title}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
