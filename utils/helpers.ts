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

  return debouncedFn as DebounceFn<T>;
}
