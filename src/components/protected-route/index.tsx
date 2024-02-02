import { registerUser } from "@/api/auth";
import { useAuth } from "@/hooks/contextHooks";
import { auth } from "@/utils/firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    const provider = new GoogleAuthProvider();

    signInWithRedirect(auth, provider)
      .then(async (data) => {
        await registerUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return children;
}
