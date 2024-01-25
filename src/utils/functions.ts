export const createRandomCode = () => {
  const min = 100000;
  const max = 999999;

  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNum.toString();
};

export const countMatchingElements = (
  answerInputs: (number | undefined)[],
  answers: number[]
) => {
  let count = 0;

  answerInputs.forEach((element, index) => {
    if (element === answers[index]) {
      count++;
    }
  });

  return count;
};

export const firebaseAuthError = (code: string) => {
  switch (code) {
    case "auth/user-not-found" || "auth/wrong-password":
      return "이메일 혹은 비밀번호가 일치하지 않습니다.";
    case "auth/email-already-in-use":
      return "이미 사용 중인 이메일입니다.";
    case "auth/weak-password":
      return "비밀번호는 6글자 이상이어야 합니다.";
    case "auth/network-request-failed":
      return "네트워크 연결에 실패 하였습니다.";
    case "auth/invalid-email":
      return "잘못된 이메일 형식입니다.";
    case "auth/internal-error":
      return "잘못된 요청입니다.";
    default:
      return "이메일 혹은 비밀번호가 일치하지 않습니다.";
  }
};

export const getQuestionTypeLabel = (questionType: string) => {
  switch (questionType) {
    case "language":
      return "언어이해";
    case "reasoning":
      return "추리논증";
    default:
      return "";
  }
};
