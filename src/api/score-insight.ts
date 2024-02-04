import { leetYearsData } from "@/data/leetAnswers";
import {
  ScoreInsightsData,
  UserAnswersData,
  UserChartScores,
} from "@/types/scoreInsights";
import { db } from "@/utils/firebase";

import { User } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export const getUserAnswers = (
  currentUser: User,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAnswersData: React.Dispatch<
    React.SetStateAction<UserAnswersData[] | undefined>
  >,
  setChartScoresData: React.Dispatch<
    React.SetStateAction<UserChartScores | undefined>
  >
) => {
  setLoading(true);
  const answersQuery = query(
    collection(db, "userTests", currentUser.uid, "scoreInsights"),
    orderBy("createdAt")
  );

  const unsubscribe = onSnapshot(answersQuery, (snapshot) => {
    const userAnswersData = snapshot.docs.map((doc, index) => ({
      ...(doc.data() as UserAnswersData),
      index: index + 1,
      id: doc.id,
    }));
    setAnswersData(userAnswersData);

    const userChartScores = {} as UserChartScores;

    leetYearsData.forEach((leetYear) => {
      const matchingDocs = snapshot.docs.filter(
        (doc) => doc.data().year === leetYear
      );
      if (matchingDocs.length > 0) {
        userChartScores[leetYear] = matchingDocs.map((doc) => {
          const { year, language, reasoning } = doc.data();

          return {
            year,
            id: doc.id,
            languageScore: language.score,
            languageStandardScore: language.standardScore,
            languagePercentile: language.percentile,
            reasoningScore: reasoning.score,
            reasoningStandardScore: reasoning.standardScore,
            reasoningPercentile: reasoning.percentile,
          };
        });
      } else {
        userChartScores[leetYear] = [];
      }
    });

    setChartScoresData(userChartScores);

    setLoading(false);
  });

  return () => {
    unsubscribe();
  };
};

// setLoading??
export const deleteUserAnswer = async (id: string, uid: string) => {
  try {
    await deleteDoc(doc(db, "userTests", uid, "scoreInsights", id));
  } catch (e) {
    console.log(e);
  }
};

export const getScoreInsight = async (
  currentUser: User,
  id: string,
  setScoreInsight: React.Dispatch<
    React.SetStateAction<ScoreInsightsData | undefined>
  >,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);

  const querySnapshot = await getDoc(
    doc(db, "userTests", currentUser.uid, "scoreInsights", id)
  );

  const data = {
    ...(querySnapshot.data() as ScoreInsightsData),
    id: querySnapshot.id,
  };

  setScoreInsight(data);
  setLoading(false);
};
