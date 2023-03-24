import cx from 'classnames';

export function OrderBook({ bids, asks, tokenId = "USD" }: { bids: any[], asks: any[], tokenId: string | undefined }) {
    const bidsTotal = bids.length ? bids.reduce((prev, curr) => parseFloat(prev) + parseFloat(curr[1])) : 0
    const asksTotal = asks.length ? asks.reduce((prev, curr) => parseFloat(prev) + parseFloat(curr[1])) : 0
    let currentBidsTotal = 0;
    let currentAsksTotal = 0;
    return <div className="flex flex-wrap align-stretch justify-between">
        <div className="m-2 text-sm flex-1">
            <div className="text-xs flex my-2 justify-between align-center">
                <p>Price ({tokenId})</p>
                <p>Quantity ({tokenId})</p>
                <p>Total ({tokenId})</p>
            </div>
            {bids.map((order, index) => {
                const [_price, _quantity] = order;
                const price = parseFloat(_price);
                const quantity = parseFloat(_quantity);
                const total = currentBidsTotal + quantity;
                currentBidsTotal = total;
                const percentage = total / bidsTotal * 100;
                const formattedPrice = Intl.NumberFormat().format(price)
                const formattedQuantity = Intl.NumberFormat().format(quantity)
                return <div key={"bid-" + index} className="flex my-2 justify-between align-center relative">
                    <div style={{ width: percentage + "%" }} className={cx(`absolute h-full w-[${percentage.toFixed(0)}%] top-0 z-0 opacity-25 right-0 bg-[#90ee90]`)}>&nbsp;</div>
                    <p>{formattedPrice}</p>
                    <p>{formattedQuantity}</p>
                    <p>{Intl.NumberFormat().format(total)}</p>
                </div>
            })}
        </div>
        <div className="m-2 text-sm flex-1">
            <div className="text-xs flex my-2 justify-between align-center">
                <p>Total ({tokenId})</p>
                <p>Quantity ({tokenId})</p>
                <p>Price ({tokenId})</p>
            </div>
            {asks.map((order, index) => {
                const [_price, _quantity] = order;
                const price = parseFloat(_price);
                const quantity = parseFloat(_quantity);
                const total = currentAsksTotal + quantity;
                currentAsksTotal = total;
                const percentage = total / asksTotal * 100;
                const formattedPrice = Intl.NumberFormat().format(price)
                const formattedQuantity = Intl.NumberFormat().format(quantity)
                return <div key={"ask-" + index} className="flex my-2 justify-between align-center relative">
                    <div style={{ width: percentage + "%" }} className={cx(`absolute h-full top-0 z-0 opacity-25 left-0 bg-[#ffcccb]`)}>&nbsp;</div>
                    <p>{formattedPrice}</p>
                    <p>{formattedQuantity}</p>
                    <p>{Intl.NumberFormat().format(total)}</p>
                </div>
            })}
        </div>
    </div>
}