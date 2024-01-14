import { endpoints } from "./endpoints";

import { Brew, CreateBrew } from "@/types/Brew";

export async function getBrews(): Promise<Brew[]> {
  const brews = await fetch(endpoints.brew);
  return brews.json();
}

export async function createBrew(brew: CreateBrew): Promise<number> {
  const response = await fetch(endpoints.brew, {
    method: "POST",
    body: JSON.stringify(brew),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function deleteBrew(id: number): Promise<number> {
  const response = await fetch(`${endpoints.brew}/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
