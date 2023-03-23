import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import SearchTokenPair from '@/components/Search/SearchTokenPair'
import Card from '@/components/Card/Card'
import ETH from '../node_modules/cryptocurrency-icons/128/icon/eth.png';
import BNB from '../node_modules/cryptocurrency-icons/128/icon/bnb.png';
import MATIC from '../node_modules/cryptocurrency-icons/128/icon/matic.png';
import WBTC from '../node_modules/cryptocurrency-icons/128/icon/wbtc.png';
import UNI from '../node_modules/cryptocurrency-icons/128/icon/uni.png';
import SUSHI from '../node_modules/cryptocurrency-icons/128/icon/sushi.png';
import ZRX from '../node_modules/cryptocurrency-icons/128/icon/zrx.png';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Tech Test</title>
        <meta name="description" content="Technical test from The Risk Protocol" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <SearchTokenPair />
        <h1 className='text-4xl uppercase font-bold text-center mt-20'>Get the best prices accross all exchanges</h1>
        <p className='text-center text-xl'>Select a token below to view and start trading</p>
        <div className='flex mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full'>
          <Card title='ETH' subtitle='$1,322.59' icon={ETH.src} href="/trade/ETH-USD">
            <h2>+7.8%</h2>
          </Card>
          <Card title='BNB' subtitle='$1,322.59' color='yellow' icon={BNB.src} href="/trade/BNB-USD">
            <h2>+7.8%</h2>
          </Card>
          <Card title='MATIC' subtitle='$1,322.59' color='purple' icon={MATIC.src} href="/trade/MATIC-USD">
            <h2>+7.8%</h2>
          </Card>
          <Card title='WBTC' subtitle='$1,322.59' color='black' icon={WBTC.src} href="/trade/WBTC-USD">
            <h2>+7.8%</h2>
          </Card>
          <Card title='UNI' subtitle='$1,322.59' color='pink' icon={UNI.src} href="/trade/UNI-USD">
            <h2>+7.8%</h2>
          </Card>
          <Card title='SUSHI' subtitle='$1,322.59' color='pink' icon={SUSHI.src} href="/trade/SUSHI-USD">
            <h2>+7.8%</h2>
          </Card>
          <Card title='ZRX' subtitle='$1,322.59' color='black' icon={ZRX.src} href="/trade/ZRX-USD">
            <h2>+7.8%</h2>
          </Card>
        </div>

      </main>
    </>
  )
}
