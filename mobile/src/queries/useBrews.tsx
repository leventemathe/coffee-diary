import { useQuery } from "@tanstack/react-query";

import { getBrews } from "@/networking/brew";

export function useBrews() {
  return useQuery({ queryKey: ["brews"], queryFn: getBrews });
}
