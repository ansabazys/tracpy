import { createApiClient } from "../core/create-client";

export const authProtectedApi = createApiClient(
  process.env.NEXT_PUBLIC_AUTH_API_URL!
);