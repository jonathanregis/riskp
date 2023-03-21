import { tokenPairProps } from "@/types/tokenPair";

export const getOrderBook = (
  pair: tokenPairProps
) => {
  return fetch(
    `https://api.0x.org/orderbook/v1?baseToken=${pair.baseAddress}&quoteToken=${pair.quoteAddress}`
  )
    .then((res) => res.json())
    .then((response) => response);
};
