import { useQuery } from "@tanstack/react-query";

import { endpoints } from "@/utils/endpoints";

async function getBrews() {
  const brews = await fetch(endpoints.brew);
  return brews.json();
}

export function useBrews() {
  return useQuery({ queryKey: ["brews"], queryFn: getBrews });
}
