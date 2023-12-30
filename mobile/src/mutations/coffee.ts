import { useMutation } from "@tanstack/react-query";

import { createCoffee } from "@/networking/coffee";

export function useCreateCoffee() {
  return useMutation({
    mutationFn: createCoffee,
  });
}
