import Navigationbar from './Navigationbar'
import Head from 'next/head'

const Layout = ( {children} ) => {
  return (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <title>Projects Update Blog</title>
      </Head>

        <Navigationbar />
        {children}
    </div>
  )
}

export default Layout