import { useEffect } from "react";

export default function useDebounce(
  delay = 1000,
  watch: any,
  callback: () => void
) {
  useEffect(() => {
    const handler = setTimeout(callback, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [watch, delay]);
}
