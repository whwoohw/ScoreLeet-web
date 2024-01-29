export type LeetYears =
  // | "2009pre"
  | "2009"
  | "2010"
  | "2011"
  | "2012"
  | "2013"
  | "2014"
  | "2015"
  | "2016"
  | "2017"
  | "2018"
  | "2019"
  | "2020"
  | "2021"
  | "2022"
  | "2023"
  | "2024";

export type LeetTypes = "odd" | "even";

export type QuestionTypes = "reasoning" | "language";

export type LeetAnswersData = Record<LeetYears, Record<LeetTypes, number[]>>;
