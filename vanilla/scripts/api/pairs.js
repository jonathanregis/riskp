const coinAPIKey =
  "120020C1-4A43-4E92-B16D-6406D8F1E157";

function getOrderBook (
  pair
) {
  return fetch(
    `https://api.0x.org/orderbook/v1?baseToken=${pair.base}&quoteToken=${pair.quote}`
  )
    .then((res) => res.json())
    .then((response) => response);
};

function getPairRate (
  pair
)  {
  const { quote, base } = pair;
  const time_start = new Date(
    new Date().getTime() - 24 * 60 * 60 * 1000
  ).toISOString();
  const time_end = new Date().toISOString();
  return fetch(
    `./mocks/pairRates.json`,
    { headers: { "X-CoinAPI-Key": coinAPIKey } }
  )
    .then((res) => res.json())
    .then((response) =>
      response.map((r) => ({
        ...r,
        id: base,
      }))
    )
    .catch((e) => {
      throw e;
    });
  // Promise.resolve(pairRates);
};
