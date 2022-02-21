import "dotenv/config";

export function getConfig() {
  // Configure the audience here. By default, it will take whatever is in the config
  // (specified by the `audience` key) unless it's the default value of "YOUR_API_IDENTIFIER" (which
  // is what you get sometimes by using the Auth0 sample download tool from the quickstart page, if you
  // don't have an API).
  // If this resolves to `null`, the API page changes to show some helpful info about what to do
  // with the audience.
  const audience =
    process.env.audience &&
    process.env.audience !== "https://dev-djgc80yi.us.auth0.com/api/v2/"
      ? process.env.audience
      : null;

  return {
    domain: process.env.domain,
    clientId: process.env.clientId,
    ...(audience ? { audience } : null)
  };
}
