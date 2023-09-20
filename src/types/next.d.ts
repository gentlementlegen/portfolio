import { NextComponentType, NextPageContext } from 'next'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { Router } from 'next/router'

declare module 'next/app' {
  export declare type AppProps<P = any> = AppPropsType<Router, P> & {
    Component: NextComponentType<NextPageContext, any, any> & { hideMainLayout?: boolean }
  }
}

declare module 'next' {
  export declare type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    hideMainLayout?: boolean
  }
}
