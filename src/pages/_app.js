import '@/styles/globals.css'
import { AuthContextProvider } from '@/context/AuthContext'
import {NextUIProvider} from '@nextui-org/react'

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </NextUIProvider>
  )
}
