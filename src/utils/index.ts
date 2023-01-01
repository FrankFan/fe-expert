import { NFTTeamSelectParams } from '@/types'
import { ethers, utils } from 'ethers'
import { addELKEvent } from './monitor/elk'

export const formatDetailData = (origin: any) => {
  const res = origin.map((it: any) => {
    const data = []
    for (const [key, value] of Object.entries(it)) {
      data.push({
        title: key,
        content: value,
      })
    }
    return data
  })
  return res
}

export const getProvider = () => {
  const ethereum = window.ethereum
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    return provider
  }
}

interface SwitchEthereumChainParameter {
  chainId: string
}

export const switchEthereumChain = async ({ chainId }: SwitchEthereumChainParameter) => {
  await window.ethereum?.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId }],
  })
}

export const NetworkMap = {
  ETHEREUM_MAINNET: {
    chainId: utils.hexValue(1), // '0x1
  },
  POLYGON_MAINNET: {
    chainId: utils.hexValue(137), // '0x89'
  },
  POLYGON_MUMBAI: {
    chainId: utils.hexValue(80001), // '0x13881'
  },
  BSC_MAINNET: {
    chainId: utils.hexValue(56), // '0x38'
  },
}

/**
 *  1 未登录
 *  2 已登录
 *  3 已参与过预测
 *  4 活动结束
 */
export enum ActivityState {
  NotLogin = 1,
  Login,
  Joined,
  Finish,
  Ended,
}

export async function connectWallet(): Promise<string> {
  try {
    const ethereum = await getEthereum()
    const accounts = await ethereum.request({
      method: 'eth_accounts',
    })
    if (Array.isArray(accounts) && accounts[0]) {
      return accounts[0]
    } else {
      throw 'connect wallet address not found'
    }
  } catch (error: any) {
    try {
      addELKEvent({
        t: 'connect_wallet_error',
        ext: {
          error: JSON.stringify(error || {}),
          message: error.message || '',
          href: window.location.href,
        },
      })
    } catch (_) {}
    throw error
  }
}

/**
 * 获取 chainId
 * @returns string
 * @see https://docs.metamask.io/guide/ethereum-provider.html#ethereum-chainid-deprecated
 */
export async function getChainId(): Promise<string> {
  const ethereum = await getEthereum()
  try {
    return await ethereum.request({
      method: 'eth_chainId',
    })
  } catch (error: any) {
    try {
      addELKEvent({
        t: 'call_eth_chainId_error',
        ext: {
          error: JSON.stringify(error || {}),
          message: error.message || '',
          href: window.location.href,
        },
      })
    } catch (_) {}
  }
  throw 'no ethereum when call eth_chainId'
}

export const formatAddress = (address: string) => {
  if (!address) return ''
  return address.substring(0, 6) + '...' + address.substring(address.length - 4)
}

export function getDefalutLanguage() {
  try {
    const match = window.navigator.userAgent.match(/lang=([^;]*)/) ?? []
    const lang = match[1] ?? 'en_US'
    return lang
  } catch (error) {
    return 'en_US'
  }
}

export function importMetaEnvByKey(envKey: string) {
  const envObj = import.meta.env
  return envObj[envKey]
}

export const formatNumberUnit = (formatedNumber: number | undefined) => {
  if (!formatedNumber) return

  let retValue = ''
  // 整数部分大于1000，0位小数
  // 整数部分大于100，2为小数
  // 整数部分小于100，4位小数
  const integerPart = Number(formatedNumber.toFixed(0))
  if (integerPart > 1000) {
    retValue = formatedNumber.toFixed(0)
  } else if (integerPart > 100 && integerPart < 1000) {
    retValue = formatedNumber.toFixed(2)
  } else {
    retValue = formatedNumber.toFixed(4)
  }
  return retValue
}

/**
 * https://github.com/ethers-io/ethers.js/issues/488
 * 避免精度丢失
 * @param list
 * @param mintRate
 * @returns
 */
export const calculateAmountWithFN = (list: Array<NFTTeamSelectParams>, mintRate: number) => {
  let amount = ethers.FixedNumber.from('0')

  for (let team of list) {
    // amount += i.count * i.mintPrice * mintRate
    const countFN = ethers.FixedNumber.from(team.count)
    const mintPriceFN = ethers.FixedNumber.from(team.mintPrice.toString())
    const mintRateFN = ethers.FixedNumber.from(mintRate.toString())
    const totalAmountFN = countFN.mulUnsafe(mintPriceFN).mulUnsafe(mintRateFN)
    amount = totalAmountFN.addUnsafe(amount)
  }
  return amount._value
}

/**
 * 对数组count字段的累积求和
 * @param list 数组
 * @returns Number
 */
export const calculateArraySum = (list: Array<NFTTeamSelectParams>) => {
  let count = 0
  for (let i of list) {
    count += i.count
  }
  return count
}

async function handleUpdateWeb3Config() {
  const result = await (window as any).flutter_inappwebview?.callHandler('handlerWeb3Request', {
    name: 'getConfig',
  })
  if (result.code === '0000') {
    console.log('手动通过bridge获取config')
    ;(window as any).ethereum?.setConfig(result.payload)
  }
}

export function getEthereum(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    resolve(window.ethereum)
  })
}
