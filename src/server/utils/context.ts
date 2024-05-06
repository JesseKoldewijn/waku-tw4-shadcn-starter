import { getEnv } from "waku/server";

export const serverGetHostUrl = () => {
  const hostUrl = getEnv("VERCEL_URL");
  const isLocalhost = hostUrl?.includes("localhost");
  const includesProto =
    hostUrl?.includes("http://") || hostUrl?.includes("https://");

  if (!hostUrl) return "http://localhost:3000";

  if (hostUrl.includes("http://") || hostUrl.includes("https://")) {
    return hostUrl;
  }

  if (isLocalhost) {
    return `http://${hostUrl}`;
  } else if (!includesProto) {
    return `https://${hostUrl}`;
  } else {
    return hostUrl;
  }
};
