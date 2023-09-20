declare module 'next/app' {
  import { NextComponentType, NextPageContext } from 'next'
  import { AppPropsType } from 'next/dist/shared/lib/utils'
  import { Router } from 'next/router'
  export declare type AppProps<P = any> = AppPropsType<Router, P> & {
    Component: NextComponentType<NextPageContext, any, any> & { hideMainLayout?: boolean }
  }
}

declare module 'next' {
  import { NextComponentType, NextPageContext } from 'next'
  export declare type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    hideMainLayout?: boolean
  }
}
