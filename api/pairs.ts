import { tokenPairProps } from "@/types/tokenPair";

const coinAPIKey =
  "916BEB7D-3247-4B9F-8C07-4C94A141781C";

export const getOrderBook = (
  pair: tokenPairProps
) => {
  return fetch(
    `https://api.0x.org/orderbook/v1?baseToken=${pair.base}&quoteToken=${pair.quote}`
  )
    .then((res) => res.json())
    .then((response) => response);
};

export const getPairRate = (
  pair: tokenPairProps
) => {
  //   const { quote, base } = pair;
  //   const time_start = new Date(
  //     new Date().getTime() - 24 * 60 * 60 * 1000
  //   ).toISOString();
  //   const time_end = new Date().toISOString();
  //   return fetch(
  //     `https://rest.coinapi.io/v1/exchangerate/${base}/${quote}/history?period_id=15MIN&time_start=${time_start}&time_end=${time_end}`,
  //     { headers: { "X-CoinAPI-Key": coinAPIKey } }
  //   )
  //     .then((res) => res.json())
  //     .then((response) => response)
  //     .catch((e) => {
  //       throw e;
  //     });
  return Promise.resolve([]);
};
