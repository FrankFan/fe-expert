import { StoreProvider } from '@/hooks/useStore'
import { Outlet } from 'react-router-dom'
export default function ProviderLayout() {
  return (
    <StoreProvider>
      <div className='layout-main'>
        <Outlet />
      </div>
    </StoreProvider>
  )
}
