import { useQuery } from "@tanstack/react-query";

import { Brew } from "@/types/Brew";
import { endpoints } from "@/utils/endpoints";

async function getBrews(): Promise<Brew[]> {
  const brews = await fetch(endpoints.brew);
  return brews.json();
}

export function useBrews() {
  return useQuery({ queryKey: ["brews"], queryFn: getBrews });
}
