import {
  handleAnswerSubmissionProps,
  handleUserAnswerSubmissionProps,
} from "@/types/api";
import { getQuestionTypeLabel } from "@/utils/answerTable";
import { db } from "@/utils/firebase";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";

export const handleAnswerSubmission = async ({
  answerInputs,
  score,
  leetYear,
  leetType,
  title,
  setSubmit,
  setScore,
}: handleAnswerSubmissionProps) => {
  if (score > 5) {
    try {
      await addDoc(
        collection(db, "answers", `${leetYear}(${leetType})`, title),
        {
          score: score,
          answers: answerInputs,
          createdAt: Timestamp.now(),
        }
      );
      console.log("success");
    } catch (e) {
      console.log(e);
    } finally {
      setSubmit(true);
      setScore(score);
      window.alert("채점이 완료되었습니다.");
    }
  } else {
    setSubmit(true);
    setScore(score);
    window.alert("채점이 완료되었습니다.");
  }
};

export const handleUserAnswerSubmission = async ({
  currentUser,
  answerInputs,
  score,
  standardScore,
  percentile,
  leetYear,
  leetType,
  title,
  setSubmit,
  setScore,
}: handleUserAnswerSubmissionProps) => {
  try {
    await addDoc(collection(db, "scoreInsights", currentUser.uid, leetYear), {
      score,
      standardScore,
      percentile,
      answers: answerInputs,
      questionType: getQuestionTypeLabel(title),
      leetType,
      createdAt: Timestamp.now(),
    });

    await setDoc(
      doc(
        db,
        "scoreInsights",
        currentUser.uid,
        getQuestionTypeLabel(title),
        leetYear
      ),
      {
        score,
        standardScore,
        percentile,
        answers: answerInputs,
        leetType,
        createdAt: Timestamp.now(),
      }
    );

    console.log("user success");
  } catch (e) {
    console.log(e);
  } finally {
    setSubmit(true);
    setScore(score);
    window.alert("채점이 완료되었습니다.");
  }
};
