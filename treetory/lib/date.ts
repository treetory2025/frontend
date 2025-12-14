export const isChristmas2025InKorea = (date: Date = new Date()) => {
  const parts = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value;

  return get("year") === "2025" && get("month") === "12" && get("day") === "25";
};

export const getDaysUntilChristmas2025InKorea = (date: Date = new Date()) => {
  const parts = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);

  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value);

  // 오늘 (한국 기준, 시간 제거)
  const today = new Date(get("year"), get("month")! - 1, get("day"));

  const christmas = new Date(2025, 11, 25);

  const diff = christmas.getTime() - today.getTime();

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
