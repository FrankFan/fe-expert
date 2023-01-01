import '@/styles/common.css' //覆盖
import '@/styles/globals.scss' //全局的css
import 'antd-mobile/es/global'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BlankLayout from './layouts/BlankLayout'
import ProviderLayout from './layouts/ProviderLayout'
import Home from './pages/Home/'
// import { LandingPage } from './pages/LandingPage'
// import MyPredict from './pages/MyPredict'
// import Predict from './pages/Predict'
// import PreOrder from './pages/PreOrder'
// import SharePage from './pages/SharePage'
import './styles/normalize.css'

function App() {
  return (
    <div className='App'>
      <BrowserRouter basename='/'>
        <Routes>
          {/* <Route path='/' element={<ProviderLayout />}>
            <Route path='/' element={<LandingPage />} />
            <Route path='predict' element={<Predict />} />
            <Route path='preorder' element={<PreOrder />} />
            <Route path='myPredict' element={<MyPredict />} />
          </Route> */}

          <Route path='/' element={<BlankLayout />}>
            <Route path='egg' element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
