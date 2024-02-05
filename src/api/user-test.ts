import { handleUserTestSubmissionProps } from "@/types/api";
import { db } from "@/utils/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";

export const handleUserTestSubmission = async ({
  currentUser,
  leetYear,
  languageAnswerInputs,
  languageScore,
  languageStandardScore,
  languagePercentile,
  reasoningAnswerInputs,
  reasoningScore,
  reasoningStandardScore,
  reasoningPercentile,
  navigate,
}: handleUserTestSubmissionProps) => {
  try {
    await addDoc(
      collection(db, "userTests", currentUser.uid, "scoreInsights"),
      {
        language: {
          score: languageScore,
          standardScore: languageStandardScore,
          percentile: languagePercentile,
          answers: languageAnswerInputs,
        },
        reasoning: {
          score: reasoningScore,
          standardScore: reasoningStandardScore,
          percentile: reasoningPercentile,
          answers: reasoningAnswerInputs,
        },
        year: leetYear,
        createdAt: Timestamp.now(),
      }
    );
  } catch (e) {
    console.log(e);
  } finally {
    window.alert("채점이 완료되었습니다.");
    navigate("/score-insights");
  }
  return "ok";
};
