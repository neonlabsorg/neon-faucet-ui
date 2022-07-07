export const FAUCET_URL =
  process.env.NODE_ENV === "development" ? "" : "https://api." + window.location.hostname

export const REQUEST_LIMIT_SEC = 60
