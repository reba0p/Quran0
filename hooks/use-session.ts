import { type AdapterSession, type AdapterUser } from "@auth/core/adapters";
import { useQuery } from "@tanstack/react-query";

const mockSessionData = {
  user: {
    name: "rebin sarbaz",
    email: "rebinsabaz@gmail.com",
    image: null,
    id: "9a5c5a04-1414-4f42-8afb-ddc449e7aff9",
  },
  expires: "2025-04-02T03:22:07.886Z",
};

export const useSession = () => {
  const { data, status } = useQuery({
    queryKey: ["@AUTH_SESSION"],
    queryFn: async () => {
      // Uncomment this line for actual API request
      // const res = await fetch("/api/auth/session", { cache: "no-store" });
      // return (await res.json()) as { user: AdapterUser } & AdapterSession;
      return mockSessionData; // Using mock data for now
    },
    staleTime: Infinity,
  });
  return { session: data, status };
};
