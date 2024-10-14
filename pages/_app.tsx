// pages/_app.tsx
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/static/favicon.ico" />
        <title>Ukumi AI - Copilot for Creators</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp