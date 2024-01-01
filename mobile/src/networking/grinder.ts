import { endpoints } from "./endpoints";

import { CreateGrinder, Grinder } from "@/types/Grinder";

export async function createGrinder(grinder: CreateGrinder): Promise<number> {
  const response = await fetch(endpoints.grinder, {
    method: "POST",
    body: JSON.stringify(grinder),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function getGrinders(): Promise<Grinder[]> {
  const response = await fetch(endpoints.grinder);
  return response.json();
}

export async function deleteGrinder(id: number): Promise<number> {
  const response = await fetch(`${endpoints.grinder}/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
