import { useEffect } from "react";
import { useAuthStore } from "../store/auth-store";
import { getCurrentUser } from "../api/services/auth.api";

export const useAuth = () => {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch {
        setLoading(false);
      }
    };

    init();
  }, [setUser, setLoading]);
};