import { tokenPairProps } from "@/types/tokenPair";
const pairRates = require("@/mockData/pairRates.json");

export const coinAPIKey =
  "6556ACD2-B7A5-4FDA-9FCE-3AB5F1A771A5";

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
  const { quote, base } = pair;
  const time_start = new Date(
    new Date().getTime() - 24 * 60 * 60 * 1000
  ).toISOString();
  const time_end = new Date().toISOString();
  return fetch(
    `https://rest.coinapi.io/v1/exchangerate/${base}/${quote}/history?period_id=15MIN&time_start=${time_start}&time_end=${time_end}`,
    { headers: { "X-CoinAPI-Key": coinAPIKey } }
  )
    .then((res) => res.json())
    .then((response) =>
      response.map((r: any) => ({
        ...r,
        id: base,
      }))
    )
    .catch((e) => {
      throw e;
    });
  // return Promise.resolve(pairRates);
};
