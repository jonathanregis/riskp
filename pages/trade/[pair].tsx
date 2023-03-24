import Head from 'next/head'
import styles from '@/styles/Trade.module.css'
import { useRouter } from 'next/router'
import { getPairFromString, getTokenPairAddresses } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import { coinAPIKey, getOrderBook, getPairRate } from '@/api/pairs';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic'
import { PairSelector } from '@/components/PairSelector/PairSelector';
import { useTokens } from '@/contexts/TokensContext';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { v4 } from 'uuid';
import { OrderBook } from '@/components/OrderBook/OrderBook';

const orderBookMock = require("@/mockData/orderBook.json");

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const reqId = v4();

export default function TradePair() {
    const router = useRouter();
    //if I don't use the state to set the pair parameter, we get an error from getPairFromString 
    //because it runs before the router is ready. Solution is to use useEffect to control when router is ready
    const [pair, setPair] = useState(router.query.pair);
    const [tokenPair, setTokenPair] = useState<{ quote: string, base: string } | null>(null);
    const [history, setHistory] = useState<any[]>([]);
    const [bids, setBids] = useState<any[]>([]);
    const [asks, setAsks] = useState<any[]>([])
    const { tokens } = useTokens();

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
            text: "Data for the last 24H at 15 Min intervals",
            align: 'left',
            margin: 0
        },
        stroke: {
            curve: 'straight',
            lineCap: 'square',
            colors: ["#daec03"],
            width: 3,
            dashArray: 0,
        },
        fill: {
            type: "gradient"
        },
        yaxis: {
            labels: {
                show: false
            },
        },
        xaxis: {
            type: 'datetime',
            categories: history.length ? history.map((x) => x.time_close) : [],
            borders: {
                show: false
            }
        },
        tooltip: {
            shared: false,
            x: {
                format: 'hh:mm tt'
            }
        },
        grid: {
            show: false
        }
    }

    useEffect(() => {
        if (router.isReady) {
            setPair(router.query.pair)
            setTokenPair(getPairFromString(router.query.pair as string));
        }
    }, [router.isReady])

    useEffect(() => {
        if (tokenPair && tokens.length) {
            getPairRate(tokenPair).then(data => {
                setHistory(data)
            })
        }
    }, [tokenPair, tokens])

    const { sendMessage, lastMessage, readyState } = useWebSocket("wss://ws.bitstamp.net");
    const [messageHistory, setMessageHistory] = useState<any[]>([]);

    useEffect(() => {
        if (lastMessage !== null) {
            console.log({ lastMessage })
            setMessageHistory((prev) => prev.concat(lastMessage));
            const data = JSON.parse(lastMessage.data);
            if (data.data.bids) {
                setBids(data.data.bids)
            }
            if (data.data.asks) {
                setAsks(data.data.asks)
            }
        }
    }, [lastMessage, setMessageHistory]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    useEffect(() => {
        if (connectionStatus === "Open" && tokenPair) {
            sendMessage(JSON.stringify({
                "event": "bts:subscribe",
                "data": {
                    "channel": `order_book_${tokenPair.base.toLowerCase()}${tokenPair.quote.toLowerCase()}`
                }
            }))
        }
    }, [connectionStatus, tokenPair])

    return <>
        <style jsx global>
            {`
                body {
                    background: white;
                }
            `}
        </style>
        <Head>
            <title>{pair} | Tech Test</title>
            <meta name="description" content="Technical test from The Risk Protocol" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <div className='flex flex-1 flex-wrap self-stretch bg-white p-4'>
                <div className='mr-2 flex-1'>
                    <h1 className='text-3xl font-bold'>{tokenPair?.base} / {tokenPair?.quote}</h1>
                    <h2 className='text-xl font-bold text-mute'>{history.length ? Intl.NumberFormat().format(history[history.length - 1].rate_close) : '--'} {tokenPair?.quote}</h2>
                    {history.length && (typeof window !== 'undefined') ? <ReactApexChart options={options as ApexOptions} series={series} /> : null}
                </div>
                <div className='ml-2 flex-1'>
                    <PairSelector defaultBase={tokenPair?.base} defaultQuote={tokenPair?.quote} onApply={(b, q) => router.push({
                        pathname: "/trade/[pair]",
                        query: { pair: `${b}-${q}` }
                    }).then(() => router.reload())} />
                    <OrderBook bids={bids?.slice(0, 12)} asks={asks?.slice(0, 12)} tokenId={tokenPair?.quote} />
                </div>
            </div>
        </main>
    </>
}