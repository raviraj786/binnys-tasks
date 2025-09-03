import { Product } from "../types";

export function generateProducts(count = 5000): Product[] {
  const arr: Product[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      id: String(i),
      title: `Product ${i}`,
      price: Math.round(Math.random() * 1000) / 100,
    });
  }
  return arr;
}
