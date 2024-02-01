import { LeetYears } from "@/types/leetAnswers";
import {
  ScoreInsights,
  ScoreInsightsData,
  UserAnswersData,
} from "@/types/scoreInsights";
import { db } from "@/utils/firebase";
import { User } from "firebase/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const getUserAnswers = async (
  currentUser: User,
  leetYear: LeetYears,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAnswers: React.Dispatch<
    React.SetStateAction<UserAnswersData[] | undefined>
  >
) => {
  setLoading(true);
  const answersQuery = query(
    collection(db, "userTests", currentUser.uid, leetYear)
  );

  const querySnapshot = await getDocs(answersQuery);

  const data = querySnapshot.docs.map((doc, index) => ({
    ...(doc.data() as UserAnswersData),
    index: index + 1,
    id: doc.id,
    year: leetYear,
  }));

  setAnswers(data);
  setLoading(false);
};

export const getScoreInsights = async (
  currentUser: User,
  leetYear: LeetYears,
  setScoreInsight: React.Dispatch<
    React.SetStateAction<ScoreInsightsData | undefined>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  const scoreInsightsQuery = query(
    collection(db, "scoreInsights", currentUser.uid, leetYear),
    orderBy("createdAt")
  );

  const querySnapshot = await getDocs(scoreInsightsQuery);

  const data = querySnapshot.docs.reduce((acc: ScoreInsightsData, item) => {
    const { questionType } = item.data() as ScoreInsights;
    acc[questionType] = acc[questionType] || [];
    acc[questionType].push({ ...(item.data() as ScoreInsights), id: item.id });
    return acc;
  }, {} as ScoreInsightsData);

  setScoreInsight(data);
  setLoading(false);
};
