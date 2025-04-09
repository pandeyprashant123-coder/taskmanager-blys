import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL: "http://localhost:8000/api/v1",
    AUTH_PREFIX:"AUTH-PREFIX",
USER_PREFIX:"USER_PREFIX"
  },
};

export default nextConfig;
