import Head from 'next/head'
import styles from '@/styles/Trade.module.css'
import { useRouter } from 'next/router'
import { getPairFromString } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { getPairRate } from '@/api/pairs';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic'
import { PairSelector } from '@/components/PairSelector/PairSelector';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function TradePair() {
    const router = useRouter();
    //if I don't use the state to set the pair parameter, we get an error from getPairFromString 
    //because it runs before the router is ready. Solution is to use useEffect to control when router is ready
    const [pair, setPair] = useState(router.query.pair);
    const [tokenPair, setTokenPair] = useState<{ quote: string, base: string } | null>(null);
    const [history, setHistory] = useState<any[]>([]);

    const series = [{
        name: 'price',
        data: history.length ? history.map((x) => x.rate_close) : []
    }]

    const options = {
        chart: {
            type: 'area',
            stacked: false,
            height: 'auto',
            zoom: {
                type: 'x',
                enabled: false,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        title: {
            text: tokenPair?.base,
            align: 'left'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.4,
                opacityTo: 0.5,
                stops: [0, 90, 100]
            },
        },
        yaxis: {
            labels: {
                show: false
            },
            title: {
                text: 'Price'
            },
        },
        xaxis: {
            type: 'datetime',
            categories: history.length ? history.map((x) => x.time_close) : [],
            labels: {
                dateTimeFormatter: {
                    'hour': 'hh:mm a',
                }
            }
        },
        tooltip: {
            shared: false,
            x: {
                format: 'hh:mm tt'
            }
        }
    }

    useEffect(() => {
        if (router.isReady) {
            setPair(router.query.pair)
            setTokenPair(getPairFromString(router.query.pair as string));
        }
    }, [router.isReady])

    useEffect(() => {
        if (tokenPair) {
            getPairRate(tokenPair).then(data => {
                setHistory(data)
            })
        }
    }, [tokenPair])

    return <>
        <Head>
            <title>{pair} | Tech Test</title>
            <meta name="description" content="Technical test from The Risk Protocol" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <div className='flex flex-1 self-stretch bg-white p-4'>
                <div className='flex-grow'>
                    <h1 className='text-3xl font-bold'>{tokenPair?.base} / {tokenPair?.quote}</h1>
                    <h2 className='text-xl font-bold text-mute'>{history.length ? history[history.length - 1].rate_close : '--'} {tokenPair?.quote}</h2>
                    {history.length && (typeof window !== 'undefined') ? <ReactApexChart options={options as ApexOptions} series={series} /> : null}
                </div>
                <div className=''>
                    <PairSelector onChange={() => null} />
                </div>
            </div>
        </main>
    </>
}