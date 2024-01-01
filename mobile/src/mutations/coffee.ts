import { useMutation } from "@tanstack/react-query";

import { createCoffee, deleteCoffee } from "@/networking/coffee";

export function useCreateCoffee() {
  return useMutation({
    mutationFn: createCoffee,
  });
}

export function useDeleteCoffee(id: number) {
  return useMutation({
    mutationFn: async () => deleteCoffee(id),
  });
}
