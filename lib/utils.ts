import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatData = (data: Date) => {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(data));
};
