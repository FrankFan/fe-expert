import '@/styles/common.css' // 全局css
import 'antd-mobile/es/global'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BlankLayout from './layouts/BlankLayout'
import './styles/normalize.css'
import { routes } from '@/routes'
import { Header } from './components/Header'

function App() {
  return (
    <div className='App'>
      <BrowserRouter basename='/'>
        <Header />
        <Routes>
          <Route path='/' element={<BlankLayout />}>
            {routes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
