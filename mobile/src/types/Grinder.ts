import { Model } from "./Model";

export type CreateGrinder = {
  name: string;
  description?: string;
};

export type Grinder = Model &
  CreateGrinder & {
    id: number;
  };
