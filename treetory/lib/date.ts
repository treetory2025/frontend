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
