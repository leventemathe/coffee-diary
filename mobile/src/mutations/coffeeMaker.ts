import { useMutation } from "@tanstack/react-query";

import { createCoffeeMaker, deleteCoffeeMaker } from "@/networking/coffeeMaker";

export function useCreateCoffeeMaker() {
  return useMutation({
    mutationFn: createCoffeeMaker,
  });
}

export function useDeleteCoffeeMaker(id: number) {
  return useMutation({
    mutationFn: async () => deleteCoffeeMaker(id),
  });
}
