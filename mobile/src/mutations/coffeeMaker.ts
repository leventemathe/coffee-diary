import { useMutation } from "@tanstack/react-query";

import { createCoffeeMaker, deleteCoffeeMaker } from "@/networking/coffeeMaker";

export function useCreateCoffeeMaker() {
  return useMutation({
    mutationFn: createCoffeeMaker,
  });
}

export function useDeleteCoffeeMaker() {
  return useMutation({
    mutationFn: deleteCoffeeMaker,
  });
}
