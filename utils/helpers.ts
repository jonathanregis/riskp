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

export function getTokenPair(
  quote: string,
  base: string,
  tokens: any[]
) {
  const quoteToken = tokens.find(
    (x) => x.id == quote
  );
  const baseToken = tokens.find(
    (x) => x.id == base
  );
  if (quoteToken && baseToken) {
    return {
      quoteAddress:
        quoteToken.supported_networks[0]
          ?.contract_address ||
        quoteToken.supported_networks[1]
          ?.contract_address ||
        "",
      baseAddress:
        baseToken.supported_networks[0]
          ?.contract_address ||
        baseToken.supported_networks[1]
          ?.contract_address ||
        "",
      fullTokenDetails: { quoteToken, baseToken },
    };
  } else
    throw "One of the tokens were not found in our list of tokens";
}
