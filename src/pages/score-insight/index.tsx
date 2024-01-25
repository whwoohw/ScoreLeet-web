import { useAuth } from "@/hooks/contextHooks";
import * as S from "@/pages/score-insight/score-insight.styled";
import { db } from "@/utils/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ScoreInsight() {
  const { currentUser } = useAuth();

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const getUserInfo = () => {
      const userListQuery = query(
        collection(db, "userInfos"),
        where("uid", "==", currentUser?.uid)
      );

      const unsubscribe = onSnapshot(userListQuery, (snapshot) => {
        if (!snapshot.empty) {
          const userInfo = snapshot.docs[0].data();
          setUserInfo(userInfo);
        }
      });

      return () => {
        unsubscribe();
      };
    };
    if (currentUser) {
      getUserInfo();
    }
  }, [currentUser]);

  return <S.Wrapper></S.Wrapper>;
}
