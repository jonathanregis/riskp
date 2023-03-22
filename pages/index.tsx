import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import SearchTokenPair from '@/components/Search/SearchTokenPair'
import Card from '@/components/Search/Card/Card'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Tech Test</title>
        <meta name="description" content="Technical test from The Risk Protocol" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <SearchTokenPair />
        <div className='flex mt-4 justify-start flex-wrap w-full'>
          <Card title='ETH' subtitle='$1,322.59' icon='https://cryptoicons.org/api/icon/eth/200'>
            <h2>+7.8%</h2>
          </Card>
          <Card title='BNB' subtitle='$1,322.59' color='yellow' icon='https://cryptoicons.org/api/icon/bnb/200'>
            <h2>+7.8%</h2>
          </Card>
          <Card title='MATIC' subtitle='$1,322.59' color='purple' icon='https://cryptoicons.org/api/icon/matic/200'>
            <h2>+7.8%</h2>
          </Card>
        </div>

      </main>
    </>
  )
}
