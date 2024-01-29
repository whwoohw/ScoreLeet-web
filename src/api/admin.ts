import { AnswersData } from "@/types/admin";
import { db } from "@/utils/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export const getAdminAnswers = async (
  leetYear: string,
  leetType: string,
  questionType: string,
  setAnswersData: React.Dispatch<
    React.SetStateAction<AnswersData[] | undefined>
  >
) => {
  const answersQuery = query(
    collection(db, "answers", leetYear + "(" + leetType + ")", questionType)
  );

  const querySnapshot = await getDocs(answersQuery);

  const data = querySnapshot.docs.map((doc) => ({
    ...(doc.data() as AnswersData),
    id: doc.id,
  }));

  setAnswersData(data);
};
