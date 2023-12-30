import { RoastProfile } from "@/types/Coffee";

const roastProfileMapping: Record<RoastProfile, string> = {
  espresso: "Espresso",
  filter: "Filter",
  moka: "Moka",
};

export function getRoastProfileTitle(level: RoastProfile) {
  return roastProfileMapping[level];
}

export function getAllRoastProfiles() {
  return Object.entries(roastProfileMapping).map(([key, value]) => ({
    label: value,
    value: key,
  }));
}
