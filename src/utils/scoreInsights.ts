export const getChartToolTipLabel = (chartToolTip: string | undefined) => {
  switch (chartToolTip) {
    case "language":
      return "언어이해";
    case "reasoning":
      return "추리논증";
    case "score":
      return "내 점수";
    case "averageScore":
      return "평균점수";
    default:
      return "";
  }
};
