import { endpoints } from "./endpoints";

import { Coffee, CreateCoffee } from "@/types/Coffee";

export async function createCoffee(coffee: CreateCoffee): Promise<number> {
  const response = await fetch(endpoints.coffee, {
    method: "POST",
    body: JSON.stringify(coffee),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function getCoffees(): Promise<Coffee[]> {
  const response = await fetch(endpoints.coffee);
  return response.json();
}
