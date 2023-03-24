export type tokenPairProps = {
  base: string;
  quote: string;
};

export type pairSelectorProps = {
  defaultBase?: string;
  defaultQuote?: string;
  onApply: (base: string, quote: string) => void;
};
