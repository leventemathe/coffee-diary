import { useQuery } from "@tanstack/react-query";

import { getGrinders } from "@/networking/grinder";

export function useGrinders() {
  return useQuery({
    queryKey: ["grinders"],
    queryFn: getGrinders,
  });
}
