import { createApiClient } from "../core/create-client";

export const analyticsApi = createApiClient(
  process.env.NEXT_PUBLIC_ANALYTICS_API_URL!
);