import Constants from "expo-constants";

function getWebGoogleOAuthURL() {
  const platform = Constants.platform.web;
  

  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    // redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    redirect_uri: `http://localhost:3001/api/auth/loginIOS`,
    // client_id: process.env.GOOGLE_CLIENT_ID,
    client_id:
    // "558789760835-323i1n243blve75l9hg3r20fm1eh1cr0.apps.googleusercontent.com",
    "558789760835-q546aa7dgpcs0p04r3qaslgg7i94cueu.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  // console.log("Redirect:", options.redirect_uri);
  const qs = new URLSearchParams(options);
  // console.log("entre en getWebGoogleOAuthURL")
  return `${rootUrl}?${qs.toString()}`;
}

export default getWebGoogleOAuthURL;
