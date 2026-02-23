import { NextComponentType, NextPageContext } from 'next'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { Router } from 'next/router'

declare module 'next/app' {
  export type AppProps<P = Record<string, unknown>> = AppPropsType<Router, P> & {
    Component: NextComponentType<NextPageContext, unknown, P> & { hideMainLayout?: boolean }
  }
}

declare module 'next' {
  export type NextPage<P = Record<string, unknown>, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    hideMainLayout?: boolean
  }
}
