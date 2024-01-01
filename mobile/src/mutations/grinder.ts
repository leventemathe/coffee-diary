import { useMutation } from "@tanstack/react-query";

import { createGrinder, deleteGrinder } from "@/networking/grinder";

export function useCreateGrinder() {
  return useMutation({
    mutationFn: createGrinder,
  });
}

export function useDeleteGrinder() {
  return useMutation({
    mutationFn: deleteGrinder,
  });
}
