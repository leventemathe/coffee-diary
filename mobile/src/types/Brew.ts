import { Coffee } from "./Coffee";
import { CoffeeMaker } from "./CoffeeMaker";
import { Grinder } from "./Grinder";
import { Model } from "./Model";

export type CreateBrew = {
  coffeeId: number;
  coffeeMakerId: number;
  grinderId: number;
  input: number;
  output: number;
  time: number;
  grindSetting: number;
  temperature?: number;
  pressure?: number;
  preInfusion?: boolean;
  otherNotes?: string;
  rating: number;
};

export type Brew = Model &
  CreateBrew & {
    coffee: Coffee;
    coffeeMaker: CoffeeMaker;
    grinder: Grinder;
  };
