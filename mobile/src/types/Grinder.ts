import { Model } from "./Model";

export type Grinder = Model & {
  name: string;
  description?: string;
};
