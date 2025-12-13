export const BACKGROUND_OPTIONS = [
  { label: "고요한 밤", value: "SILENT_NIGHT" },
  { label: "눈 내리는 언덕", value: "SNOWY_HILL" },
] as const;

export const TREE_OPTIONS = [
  { label: "눈덮인 트리", value: "SNOWY" },
  { label: "기본 트리", value: "NORMAL" },
] as const;

export type BackgroundType = (typeof BACKGROUND_OPTIONS)[number]["value"];

export type TreeType = (typeof TREE_OPTIONS)[number]["value"];
