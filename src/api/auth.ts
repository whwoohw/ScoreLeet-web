import { db } from "@/utils/firebase";
import { UserCredential } from "firebase/auth";
import { Timestamp, doc, setDoc } from "firebase/firestore";

export const registerUser = async (data: UserCredential) => {
  await setDoc(doc(db, "users", data.user.uid), {
    uid: data.user.uid,
    email: data.user.email,
    createdAt: Timestamp.now(),
  });

  await setDoc(doc(db, "userTests", data.user.uid), {});
};
