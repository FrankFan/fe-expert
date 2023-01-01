import { ENV_CONFIG } from '@/constants/env'
import { connectWallet, importMetaEnvByKey } from '@/utils'
import { addELKEvent, monitor, setSentryUserData } from './elk'

const isDev = importMetaEnvByKey(ENV_CONFIG.MODE) === 'development'

const start = async () => {
  // 8
  // monitor.init({
  //   env: import.meta.env.VITE_ENV,
  //   release: '1.0.1',
  //   traceWhiteList: ['/example/bitdapp'],
  //   batchUpload: {
  //     gzip: false,
  //   },
  //   onResponse: (data: any, url: any) => {
  //     if (Number(data.retCode) === 0) {
  //       return 0
  //     } else {
  //       return Number(data.retCode)
  //     }
  //   },
  // })
  // try {
  //   const address = await connectWallet()
  //   setSentryUserData(address)
  //   console.log('[elk] address in elk ', address)
  // } catch (error) {
  //   console.log(`[elk] connectWallet fail, error = ${error}`)
  // }
}

export default { start, setSentryUserData, addELKEvent, monitor }
