import { endpoints } from "./endpoints";

import { Brew } from "@/types/Brew";

export async function getBrews(): Promise<Brew[]> {
  const brews = await fetch(endpoints.brew);
  return brews.json();
}
