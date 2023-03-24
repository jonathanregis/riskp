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
import { useTokens } from '@/contexts/TokensContext';
import { useEffect, useState } from 'react';
import { getPairRate } from '@/api/pairs';
import { StaticImageData } from 'next/image';

const icons: { [key: string]: StaticImageData } = {
  ETH,
  BNB,
  MATIC,
  WBTC,
  UNI,
  SUSHI,
  ZRX
}

const colors: { [key: string]: string } = {
  "ETH": "blue",
  "BNB": "yellow",
  "MATIC": "purple",
  "WBTC": "black",
  "UNI": "pink",
  "SUSHI": "pink",
  "ZRX": "black"
}

export default function Home() {
  const preferedTokens = ["ETH", "BNB", "MATIC", "WBTC", "UNI", "SUSHI", "ZRX"];
  const { tokens } = useTokens();
  const homeTokens = tokens.filter(token => preferedTokens.includes(token.id));
  const [rates, setRates] = useState<any>({});
  useEffect(() => {
    Promise.all(homeTokens.map((token) => getPairRate({ base: token.id, quote: "USD" }).then(r => r))).then((data) => {
      const newRates: { [key: string]: string } = {}
      const givenRates = data;
      givenRates.forEach((r, i) => {
        newRates[r[0].id] = r[r.length - 1] //I wonder why coinbase api doesn't have BNB, makes no sense
      })
      setRates(newRates)
    })
  }, [])
  const finalTokens = homeTokens.map(token => {
    return {
      id: token.id,
      icon: icons[token.id].src,
      color: colors[token.id]
    }
  })
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
          {finalTokens.map(token => {
            const { rate_close, rate_open } = rates[token.id] || { rate_close: 0, rate_open: 0 }
            return <Card key={token.id} title={token.id} subtitle={Intl.NumberFormat("US-en", { currency: "USD", style: "currency" }).format(parseFloat(rate_close))} icon={token.icon} href={`/trade/${token.id}-USD`}>
              <h2>{`${((rate_close - rate_open) / rate_close * 100).toFixed(2)}%`}</h2>
            </Card>
          })}
        </div>

      </main>
    </>
  )
}
