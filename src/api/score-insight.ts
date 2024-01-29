import { LeetYears } from "@/types/leetAnswers";
import { ScoreInsights, ScoreInsightsData } from "@/types/scoreInsights";
import { db } from "@/utils/firebase";
import { User } from "firebase/auth";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

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
