import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAppSelector } from "@/hooks/useAppDispatch";

export default function AuthGate() {
  const user = useAppSelector((state) => state.auth.user);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    const timeout = setTimeout(() => {
      if (!user && !inAuthGroup) {
        router.replace("/(auth)/login");
      } else if (user && inAuthGroup) {
        router.replace("/(tabs)/statistics");
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [user, segments]);

  return null;
}
