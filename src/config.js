import "dotenv/config";
//import config from "./auth_config.json";

export function getConfig() {
  // Configure the audience here. By default, it will take whatever is in the config
  // (specified by the `audience` key) unless it's the default value of "YOUR_API_IDENTIFIER" (which
  // is what you get sometimes by using the Auth0 sample download tool from the quickstart page, if you
  // don't have an API).
  // If this resolves to `null`, the API page changes to show some helpful info about what to do
  // with the audience.
  //const audience =
  //  process.env.REACT_APP_AUDIENCE &&
  //  process.env.REACT_APP_AUDIENCE !==
  //    "https://dev-djgc80yi.us.auth0.com/api/v2/"
  //    ? process.env.REACT_APP_AUDIENCE
  //    : null;
  //: config.audience;

  return {
    domain: process.env.REACT_APP_DOMAIN,
    // || config.domain,
    clientId: process.env.REACT_APP_CLIENT_ID,
    // || config.clientId,
    audience: process.env.REACT_APP_AUDIENCE
  };
}
