import { Home } from './pages/Home'
import { Egg } from './pages/Egg'
// import { Test } from './pages/Test'

export const routes = [
  {
    path: '/',
    component: Home,
    title: 'Home',
    exact: true,
  },
  {
    path: '/egg',
    title: 'Egg',
    component: Egg,
  },
  // {
  //   path: '/editor',
  //   title: 'Editor',
  //   component: Editor,
  // },
]
