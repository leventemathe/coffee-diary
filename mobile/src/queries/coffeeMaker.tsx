import { useQuery } from "@tanstack/react-query";

import { getCoffeeMakers } from "@/networking/coffeeMaker";

export function useCoffeeMakers() {
  return useQuery({
    queryKey: ["coffeeMakers"],
    queryFn: getCoffeeMakers,
  });
}
