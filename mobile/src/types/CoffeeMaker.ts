import { Model } from "./Model";

export enum CoffeeMakerType {
  EspressoMaker = "espresso_maker",
  PouroverMaker = "pourover_maker",
  ImmersionMaker = "immersion_maker",
  DripMaker = "drip_maker",
  Other = "other_maker",
}

export type CreateCoffeeMaker = {
  name: string;
  description?: string;
  type?: CoffeeMakerType;
};

export type CoffeeMaker = Model &
  CreateCoffeeMaker & {
    id: number;
  };
