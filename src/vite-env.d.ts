/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

import 'axios'
declare module '*.svg'
declare module '*.png'
declare module '*.text'

declare module 'axios' {
  export interface AxiosRequestConfig {
    debug?: boolean
  }
}

declare module '*/LICENSE' {
  export const plainText: string
}

declare global {
  interface Window {
    ethereum: any
    addELKEvent: any
  }
}
