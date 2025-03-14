import { Model } from "./Model";

export enum RoastLevel {
  LightRoast = "light_roast",
  MediumRoast = "medium_roast",
  DarkRoast = "dark_roast",
}

export enum RoastProfile {
  Espresso = "espresso",
  Filter = "filter",
  Moka = "moka",
}

export type CreateCoffee = {
  name: string;
  description?: string;
  region?: string;
  roastLevel?: RoastLevel;
  roastProfile?: RoastProfile;
};

export type Coffee = Model &
  CreateCoffee & {
    id: number;
  };
