import { getChainId, getEthereum, getProvider, NetworkMap } from '@/utils'
// import { wordCupContractAddress } from '@/utils/abi'
import abiWorldCupNFT from '@/utils/abi/worldcup.json'
// import { ethers } from 'ethers'
import { createStore } from 'hox'
import { useEffect, useState } from 'react'

export const [useStore, StoreProvider] = createStore(() => {
  const [address, setGlobalAddress] = useState('')
  const [visible, setVisible] = useState(false)
  const [chainId, setChainId] = useState('')

  // useLayoutEffect 比 useEffect 执行时间早，此处不应该使用 useLayoutEffect
  // see: https://blog.saeloun.com/2022/07/28/difference-between-useeffect-and-useeffectlayout-hooks
  useEffect(() => {
    getEthereum().then((ethereum) => {
      ethereum?.on('chainChanged', (chainId: string) => {
        console.log('[useStore] chainChanged 触发了 ', chainId, window.ethereum.chainId)
        location.href = '/world-cup/'
      })

      ethereum?.on('accountsChanged', (accounts: Array<string>) => {
        console.log('[useStore] accountsChanged触发了, accouts = ', accounts)
        setGlobalAddress(accounts[0])
      })
    })

    getChainId()
      .then((chainId) => {
        console.log(`[useStore] 通过 eth_chainId 方法获取chainId = ${chainId}`)
        const polygonChainId = NetworkMap.POLYGON_MAINNET.chainId
        console.log(`[useStore] polygon.chainId = ${polygonChainId}`)
        setChainId(chainId)
        if (chainId !== polygonChainId) {
          // 提示网络不对
          setVisible(true)
        }
      })
      .catch((error) => {
        console.log('[useStore] 获取 chainId 失败,error = ', error)
      })
  }, [address])

  return {
    address,
    chainId: chainId,
    setGlobalAddress,
    visible,
    setVisible,
  }
})
