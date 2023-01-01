import { wordCupContractAddress } from '@/utils/abi'

// import Monitor from '@fe/monitor'

export const monitor = {}

let uid = ''

function getUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const addELKEvent = (params: any) => {
  // monitor.log(params)
  // return logger.log(params)
  return null
}

interface ApiStatusErrorType {
  status: any
  url: string
  response: any
  totalTime: number
  requestBody: any
}

export const reportApiStatusError = ({ status, url, totalTime, response, requestBody }: ApiStatusErrorType) => {
  if (status >= 500) {
    return addELKEvent({
      t: 'ajax',
      ext: {
        totalTime,
        href: window.location.href,
        hc: status,
        requestBody,
        response,
      },
      r: url,
    })
  } else if (status === -1000) {
    // 接口超时
    return addELKEvent({
      t: 'timeout',
      ext: {
        href: window.location.href,
        hc: status,
        response,
      },
      r: url,
    })
  } else {
    return addELKEvent({
      t: 'api_status_error',
      ext: {
        status,
        href: window.location.href,
        hc: status,
        totalTime,
        response,
      },
      r: url,
    })
  }
}

interface ReportApiCodeErrorType {
  code: number
  url: string
  msg: string
  totalTime: number
  requestBody: any
}

export const reportApiCodeError = ({ code, url, msg, totalTime, requestBody }: ReportApiCodeErrorType) => {
  return addELKEvent({
    t: 'server_error',
    ext: {
      totalTime,
      href: window.location.href,
      hc: code,
      msg,
      requestBody,
    },
    r: url,
  })
}

interface SlowRequestType {
  code: number
  url: string
  msg: string
  totalTime: number
  body: any
  response: any
}

export const slowRequests = ({ code, url, msg, totalTime, body, response }: SlowRequestType) => {
  return addELKEvent({
    t: 'slow_requests',
    ext: {
      totalTime,
      href: window.location.href,
      hc: code,
      msg,
      body,
      response,
    },
    r: url,
  })
}

interface UnresponsiveRequestsType {
  url: string
  method: string
  body: any
  totalTime: number
  error?: any
}

export const unresponsiveRequests = ({ url, method, body, totalTime, error }: UnresponsiveRequestsType) => {
  let errorStr = ''
  try {
    errorStr = JSON.stringify(error)
  } catch (e) {}
  return addELKEvent({
    t: 'unresponsive_requests',
    ext: {
      error,
      totalTime,
      body,
      href: window.location.href,
      method,
      errorStr,
    },
    r: url,
  })
}
export const reportInvokeContractError = ({
  chainId,
  address,
  method,
  errorMsg,
}: {
  chainId: string
  address: string
  errorMsg: string
  method: string
}) => {
  return addELKEvent({
    t: 'invoke_contract_error',
    ext: {
      href: window.location.href,
      chainId,
      address,
      method,
      errorMsg,
      contractAddress: wordCupContractAddress,
    },
    r: method,
  })
}

export const setSentryUserData = (uid: number | string) => {
  try {
    // monitor.setUser({ id: String(uid) })
  } catch (error) {}
  // Sentry.configureScope((scope) => {
  //   Monitor.setUser({ id: String(uid) })
  // })
}
