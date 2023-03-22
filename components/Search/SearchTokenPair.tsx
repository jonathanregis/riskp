import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { tokenPairProps } from '@/types/tokenPair';
import { useTokens } from '@/contexts/TokensContext';
import Link from 'next/link';
import { debounce } from '@/utils/helpers';

export default function SearchTokenPair() {
    const [term, setTerm] = useState<string>("");
    const [showList, setShowList] = useState<boolean>(false);
    const [results, setResults] = useState<tokenPairProps[]>([]);
    const { tokens } = useTokens();
    useEffect(() => {
        if (term) {
            const found = tokens?.filter((x: tokenPairProps) => x.id.includes(term.toUpperCase())) // We search the given term within the id
            if (found) {
                setResults(found)
            }
        }
    }, [term])
    const inputChange = debounce((t) => {
        if (t.target.value != "") {
            setShowList(true);
        } else {
            setShowList(false)
        }
        setTerm(t.target.value);
    }, 500)
    return <div className={cx('bg-white w-full relative max-w-2xl p-2 rounded-t-lg shadow-md', { 'rounded-b-lg': !showList })}>
        <input name="search-token" onBlur={() => setShowList(false)} onChange={inputChange} className='w-full b-0 p-2 outline-none' placeholder="Search here" />
        <div role="list" className={cx("p-2 w-full border-t absolute bg-white rounded-b-lg overflow-y-auto max-h-72 z-40 shadow-md left-0 top-full", { "hidden": !showList })}>
            {!results.length ? <p role="listitem">No results found for "{term}"</p>
                : <ul>
                    {results.map(r => {
                        return <ResultItem link={`/trade/${r.id}USD`} title={r.id} />
                    })}
                </ul>
            }
        </div>
    </div>
}

function ResultItem({ link, onClick, title, subttitle }: { link: string, onClick?: Function, title?: string, subttitle?: string }) {
    return <li role="listitem" className='p-2 my-2'><Link role="link" {...onClick} href={link}>{title}</Link></li>
}