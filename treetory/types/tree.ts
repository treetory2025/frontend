type TreeType = "default" | "add1" | "tree2";

export interface TreeItem {
  theme?: string;
  background?: string;
  type: TreeType;
  scale: number;
  offset: number;
  isEnd: boolean;
}
