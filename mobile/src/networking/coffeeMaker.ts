import { endpoints } from "./endpoints";

import { CoffeeMaker, CreateCoffeeMaker } from "@/types/CoffeeMaker";

export async function createCoffeeMaker(
  // eslint auto save bug
  // eslint-disable-next-line prettier/prettier
  coffeeMaker: CreateCoffeeMaker
): Promise<number> {
  const response = await fetch(endpoints.coffeeMaker, {
    method: "POST",
    body: JSON.stringify(coffeeMaker),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function getCoffeeMakers(): Promise<CoffeeMaker[]> {
  const response = await fetch(endpoints.coffeeMaker);
  return response.json();
}

export async function deleteCoffeeMaker(id: number): Promise<number> {
  const response = await fetch(`${endpoints.coffeeMaker}/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
