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
        <div className='flex justify-start w-full max-w-2xl'>
          <Card title='test card' subtitle='test again'>
            <p>bdjhsvjsd</p>
          </Card>
        </div>

      </main>
    </>
  )
}
