import { Ornarment } from "@/types/ornarment";

export type User = {
  uuid?: string;
  nickname?: string;
  email?: string;
  theme?: string;
  background?: string;
};

export type Owner = {
  nickname?: string;
  treeSize?: number;
  treeTheme?: string;
  treeBackground?: string;
  ornamentsRes?: Array<Ornarment>;
};
