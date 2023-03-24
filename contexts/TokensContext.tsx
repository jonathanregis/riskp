import React, { createContext, useState, useEffect, useContext, useCallback, ReactNode, ReactComponentElement, ReactElement } from 'react';
import { tokenPairProps } from '@/types/tokenPair';

// Create a new context for currency pairs
export const TokensContext = createContext<{ tokens: any[] }>({
    tokens: []
});

// Define the provider for the token pairs context
export const TokenPairsProvider = ({ children }: { children: ReactNode }) => {
    const [tokens, setTokens] = useState<any[]>([]);
    const defaultTokenPairs = ["ETH-USDC", "BNB-USDC", "MATIC-USDC", "WBTC-USDC", "UNI-USDC", "SUSHI-USDC", "ZRX-USDC"]

    // Fetch tokens from an API
    useEffect(() => {

        fetch(
            "https://api.exchange.coinbase.com/currencies"
        )
            .then((res) => res.json())
            .then((data) => {
                data.push({ "id": "BNB", "name": "Binance Coin" })
                setTokens(data)
            });
    }, []);

    const value = {
        tokens
    }

    // Render the provider with the currency pairs as the value
    return (
        <TokensContext.Provider value={value}>
            {children}
        </TokensContext.Provider>
    );
};

export const useTokens = () => useContext(TokensContext);