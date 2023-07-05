import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function memoize<T>(
  fn: () => Promise<T>,
  memo: { value?: T },
) {
  return async () => {
    if (!memo.value) memo.value = await fn();
    return memo.value;
  };
};
