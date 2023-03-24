export type DebounceFn<
  T extends (...args: any[]) => any
> = (
  fn: T,
  delay: number
) => T & { cancel: () => void };

export function debounce<
  T extends (...args: any[]) => any
>(fn: T, delay: number): DebounceFn<T> {
  let timerId: ReturnType<typeof setTimeout>;

  function debouncedFn(
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> {
    const context = this;

    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);

    return fn.apply(context, args);
  }

  debouncedFn.cancel = () => {
    clearTimeout(timerId);
  };

  return debouncedFn as unknown as DebounceFn<T>;
}

export function getPairFromString(
  s: string | undefined
) {
  if (!s) {
    throw "No string provided";
  }
  const parts = s.split("-");
  if (parts.length != 2) {
    throw "incorrect string format provided. please provide a XXX-XXX pair";
  }
  const [base, quote] = s.split("-");
  return { base, quote };
}

export function getTokenPairAddresses(
  quote: string,
  base: string,
  tokens: any[]
) {
  // If we can't find a token let's just use USDC
  // The 0x api requires contract addresses to get the order book. But USD does not have one
  // So let's use usdc to substitute usd just so we can have an address to send to the api
  if (quote == "USD") {
    quote = "USDT";
  }

  if (base == "USD") {
    base = "USDT";
  }

  console.log({ tokens });

  const quoteToken = tokens.find(
    (x) => x.id == quote
  );
  const baseToken = tokens.find(
    (x) => x.id == base
  );
  if (quoteToken && baseToken) {
    return {
      quote:
        quoteToken.supported_networks[0]
          ?.contract_address ||
        quoteToken.supported_networks[1]
          ?.contract_address ||
        "",
      base:
        baseToken.supported_networks[0]
          ?.contract_address ||
        baseToken.supported_networks[1]
          ?.contract_address ||
        "",
    };
  } else
    throw `One of the tokens were not found in our list of tokens ${
      !baseToken ? base : null
    }, ${!quoteToken ? quote : null}`;
}
