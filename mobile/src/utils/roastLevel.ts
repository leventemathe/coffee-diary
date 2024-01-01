import { RoastLevel } from "@/types/Coffee";

const roastLevelMapping: Record<RoastLevel, string> = {
  light_roast: "Light Roast",
  medium_roast: "Medium Roast",
  dark_roast: "Dark Roast",
};

export function getRoastLevelTitle(level?: RoastLevel) {
  return level ? roastLevelMapping[level] : undefined;
}

export function getAllRoastLevels() {
  return Object.entries(roastLevelMapping).map(([key, value]) => ({
    label: value,
    value: key,
  }));
}
