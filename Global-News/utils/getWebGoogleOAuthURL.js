function getWebGoogleOAuthURL() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    // redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
    // ?web=${platform !== null}
    // redirect_uri: ((platform !== null) ? `http://localhost:3001/api/auth/login` : `http://localhost:3001/api/auth/loginIOS`),
    redirect_uri: "http://localhost:3001/api/auth/login",
    // client_id: process.env.GOOGLE_CLIENT_ID,
    client_id:
      "558789760835-323i1n243blve75l9hg3r20fm1eh1cr0.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    useProxy: true,
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
