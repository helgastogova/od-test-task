import Head from 'next/head'
import Link from 'next/link'

import Layout from 'components/layout'
import Feed from 'components/feed'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>On Deck Newsfeed</title>
      </Head>

      <Feed />
    </Layout>
  )
}
