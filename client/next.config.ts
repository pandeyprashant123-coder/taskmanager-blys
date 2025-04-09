import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_BASE_URL: "https://taskmanager-blys.onrender.com/api/v1",
    AUTH_PREFIX:"AUTH-PREFIX",
USER_PREFIX:"USER_PREFIX"
  },
};

export default nextConfig;
