import { useQuery } from "@tanstack/react-query";

import { getCoffees } from "@/networking/coffee";

export function useCoffees() {
  return useQuery({
    queryKey: ["coffees"],
    queryFn: getCoffees,
  });
}
