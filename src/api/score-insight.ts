import { ScoreInsightsData, UserAnswersData } from "@/types/scoreInsights";
import { db } from "@/utils/firebase";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

export const getUserAnswers = async (
  currentUser: User,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAnswers: React.Dispatch<
    React.SetStateAction<UserAnswersData[] | undefined>
  >
) => {
  setLoading(true);
  const answersQuery = query(
    collection(db, "userTests", currentUser.uid, "scoreInsights"),
    orderBy("createdAt")
  );

  const querySnapshot = await getDocs(answersQuery);

  const data = querySnapshot.docs.map((doc, index) => ({
    ...(doc.data() as UserAnswersData),
    index: index + 1,
    id: doc.id,
  }));

  setAnswers(data);
  setLoading(false);
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
