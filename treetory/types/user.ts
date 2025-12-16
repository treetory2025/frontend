import { Ornarment } from "@/types/ornarment";
import { BackgroundType, TreeType } from "./theme";

export type User = {
  uuid?: string;
  nickname?: string;
  email?: string;
  theme?: string;
  background?: string;
};

export type Owner = {
  nickname?: string;
  isBookmarked?: boolean;
  treeSize?: number;
  treeTheme?: TreeType;
  treeBackground?: BackgroundType;
  ornamentsRes?: Array<Ornarment>;
};

export type Member = {
  memberId: string;
  nickname: string;
  email: string;
  ornamentsCount: number;
};
