import { useMutation } from "@tanstack/react-query";

import { createBrew, deleteBrew } from "@/networking/brew";

export function useCreateBrew() {
  return useMutation({
    mutationFn: createBrew,
  });
}

export function useDeleteBrew(id: number) {
  return useMutation({
    mutationFn: async () => deleteBrew(id),
  });
}
