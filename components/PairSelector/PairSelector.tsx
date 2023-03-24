import { useTokens } from "@/contexts/TokensContext";
import { pairSelectorProps } from "@/types/tokenPair";
import { ChangeEvent, useEffect, useState } from "react";

//I'm keeping this component simple. Normally I would create a custom select component or use a third party
//so I can render a better select dropdown with search capabilities and icons
//Also, I would normally make sure that you can't select the same token as base and quote at the same time. But time is running out.

export function PairSelector({ defaultBase = 'ETH', defaultQuote = 'USD', onApply }: pairSelectorProps) {
    const { tokens } = useTokens();
    const [base, setBase] = useState<string>(defaultBase);
    const [quote, setQuote] = useState<string>(defaultQuote);
    const change = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.name === "quote") {
            setQuote(e.target.value)
        } else {
            setBase(e.target.value)
        }
    }

    useEffect(() => {
        setBase(defaultBase);
        setQuote(defaultQuote);
    }, [defaultBase, defaultQuote])

    return <div className="flex flex-1 flex-wrap align-center justify-between">
        <div className="p-2">
            <p className="text-slate-400 uppercase text-xs">from</p>
            <select aria-label="from" onChange={change} value={base} name="base" className="border-none text-bold text-sm">
                {tokens.length && tokens.map((token) => {
                    return <option key={token.id} value={token.id}>{token.id} - {token.name}</option>
                })}
            </select>
        </div>
        <div className="p-2">
            <p className="text-slate-400 uppercase text-xs">to</p>
            <select aria-label="to" onChange={change} value={quote} name="quote" className="border-none text-bold text-sm">
                {tokens.length && tokens.map((token) => {
                    return <option key={token.id} value={token.id}>{token.id} - {token.name}</option>
                })}
            </select>
        </div>
        {(base != defaultBase || quote != defaultQuote) ? <button onClick={() => onApply(base, quote)} className="shadow-lg rounded-lg p-4 w-full flex-basis-full bg-[#daec03] text-bold uppercase m-4">update</button> : null}
    </div>
}