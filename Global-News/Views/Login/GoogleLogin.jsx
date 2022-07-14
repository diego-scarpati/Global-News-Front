// import Constants from 'expo-constants';
// import * as Linking from "expo-linking";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import { useEffect, useState } from "react";
// import { View, Text, Image, StyleSheet, Pressable } from "react-native";
// import axios from "axios";
// // import storage from "../storage/storage";
// import googleLogo from "../../assets/google-logo.png"
// // import getWebGoogleOAuthURL from "../../utils/getWebGoogleOAuthURL"
// // import googleLogo from "../assets/google-logo.png";
// import getGoogleOAuthURL from "../../utils/getGoogleOAuthURL";

// export default function GoogleLogin(props) {
  
  
//   const [accessToken, setAccessToken] = useState(null)
//   const [user, setUserFromStorage] = useState(null)
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: "558789760835-323i1n243blve75l9hg3r20fm1eh1cr0.apps.googleusercontent.com",
//     iosClientId: "558789760835-1lj3eem8sprhljffvdsrft6268hqn0bf.apps.googleusercontent.com"
//   })

//   useEffect(()=>{
//     if (response?.type === "success") {
//       setAccessToken(response.authentication.accessToken)
//       accessToken && fetchUserInfo()
//     }
//   }, [response])

//   async function fetchUserInfo(){
//     const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
//       headers: { Authorization : `Bearer ${accessToken}`}
//     })
//     const userInfo = await response.json()
//     setUserFromStorage(userInfo)
//   }
  


//   useEffect(() => {
//     console.log(pedido);
//   }, [result]);

//   // // Prueba con linkingHandler
//   // launchBrowser = async () => {
//   //   this.addLinkingListener();
//   //   const result = await WebBrowser.openBrowserAsync(`${uri}/?returnUri=${Linking.makeUrl("return/path")}`);
//   //   this.removeLinkingListener();
//   // }

//   // addLinkingListener = () => {
//   //   Linking.addEventListener("url", this.handleRedirect);
//   // };

//   // removeLinkingListener = () => {
//   //   Linking.removeEventListener("url", this.handleRedirect);
//   // };
  
//   // handleRedirect = (event) => {
//   //   WebBrowser.dismissBrowser();
//   //   const redirectData = Linking.parse(event.url);
//   // };

//   const url = getGoogleOAuthURL();
//   // console.log("Props de GoogleLogin: ", props)
//   // console.log("Route Name:", props.navigation.state.routeName)
//   const [pedido, setPedido] = useState(null);
//   const [result, setResult] = useState(null);
//   const handleBrowser = async () => {
//     let result = await WebBrowser.openBrowserAsync(url);
//     setResult(result);
//     Linking.getInitialURL();
//   };
//   const handleLink = async () => {
//     const url = await Linking.getInitialURL();
//     return url;
//   };

//   const handleGoogle = async () => {
//     const user = await axios.get("http://localhost:3001/api/auth/login");
//     console.log("user:", user);
//   };

//   const promesaPress = () => {
//     WebBrowser.openBrowserAsync(url).then(() =>
//       axios
//         .get("http://localhost:3001/api/auth/logged")
//         .then((res) => setPedido(res.data))
//     );
//     // setPedido(Linking.openURL(url)
//   };
//   console.log(pedido);

//   console.log("Constants.experienceUrl", Constants.experienceUrl)
//   console.log("Constants.intentUri", Constants.intentUri)
//   console.log("Constants.linkingUri", Constants.linkingUri)
//   console.log("Constants.platform", Constants.platform)
//   console.log("Constants.sessionId", Constants.sessionId)

//   return (
//     <View style={styles.gView}>
//       {/* <Pressable style={styles.gButton} onPress={() => handlePressButtonAsync()}> */}
//       {/* <Pressable style={styles.gButton} onPress={() => console.log(handleLink())}> */}
//       <Pressable style={styles.gButton} onPress={() => promesaPress()}>
//         {/* <Pressable style={styles.gButton} onPress={() => handleBrowser()}> */}
//         {/* <Pressable style={styles.gButton} onPress={() => {
//         Linking.openURL(url)
//         handleGoogle()
//         }}> */}
//         {/* <Pressable style={styles.gButton} onPress={() => {handleGoogle()}}> */}

//         {/* <Pressable style={styles.gButton} onPress={() => getGoogleOAuthURL()}> */}
//         <View>
//           <Image source={googleLogo} style={styles.gImage} />
//         </View>
//         <View>
//           <Text style={styles.gText}>Login con Google</Text>
//         </View>
//       </Pressable>
//       {/* <Pressable disabled={!request} onPress={() => promptAsync()}>
//         <View>
//           <Text style={styles.gText}>Login con Google</Text>
//         </View>
//       </Pressable> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   gView: {
//     height: 65,
//     width: 200,
//     justifyContent: "center",
//   },
//   gButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-around",
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: "white",
//     backgroundColor: "white",
//     shadowColor: "black",
//     shadowOffset: {
//       width: 2,
//       height: 5,
//     },
//     shadowRadius: 5,
//     shadowOpacity: 0.5,
//   },
//   gImage: {
//     height: 50,
//     width: 50,
//     marginLeft: 6,
//   },
//   gText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     margin: 6,
//     padding: 6,
//   },
// });




import Constants from "expo-constants";
import { View, Text, Image, StyleSheet, Pressable, Platform } from "react-native";
import googleLogo from "../../assets/google-logo.png"
import getWebGoogleOAuthURL from "../../utils/getWebGoogleOAuthURL"
import getIOSGoogleOAuthURL from "../../utils/getIOSGoogleOAuthURL";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from 'expo-auth-session';

import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
// import axios from "axios";

export default function GoogleLogin() {
  const [state, setState] = useState({redirectData: null})

  const url = getWebGoogleOAuthURL();

  const _handleRedirect = (event) => {
    if (Constants.platform.ios) {
      WebBrowser.dismissBrowser();
    } else {
      _removeLinkingListener();
    }

    let data = Linking.parse(event.url);

    setState({ redirectData: data });
    console.log(state)
  };

  // openAuthSessionAsync doesn't require that you add Linking listeners, it
  // returns the redirect URL in the resulting Promise
  const _openAuthSessionAsync = async () => {
    try {
      let result = await WebBrowser.openAuthSessionAsync(
        // We add `?` at the end of the URL since the test backend that is used
        // just appends `authToken=<token>` to the URL provided.
        `https://backend-xxswjknyfi.now.sh/?linkingUri=${Linking.createURL("/?")}`
      );
      let redirectData;
      if (result.url) {
        redirectData = Linking.parse(result.url);
      }
      setState({ result, redirectData });
      console.log(state)
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  // openBrowserAsync requires that you subscribe to Linking events and the
  // resulting Promise only contains information about whether it was canceled
  // or dismissed
  const _openBrowserAsync = async () => {
    try {
      _addLinkingListener();
      let result = await WebBrowser.openBrowserAsync(
        // We add `?` at the end of the URL since the test backend that is used
        // just appends `authToken=<token>` to the URL provided.
        `https://backend-xxswjknyfi.now.sh/?linkingUri=${Linking.createURL("/?")}`
      );

      // https://github.com/expo/expo/issues/5555
      if (Constants.platform.ios) {
        _removeLinkingListener();
      }

      setState({ result });
      console.log(state)
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const _openWebGoogleBrowserAsync = async () => {
    const url = getWebGoogleOAuthURL()

    try {
      _addLinkingListener();
      let result
      if(Platform.OS === "web") {
        // result = await Linking.openURL(
        result = await Linking.openURL(
          // We add `?` at the end of the URL since the test backend that is used
          // just appends `authToken=<token>` to the URL provided.
          // `${url}?linkingUri=${Linking.createURL("/?")}`
          url
        );
      } else {
        result = await WebBrowser.openBrowserAsync(
          // We add `?` at the end of the URL since the test backend that is used
          // just appends `authToken=<token>` to the URL provided.
          // `${url}?linkingUri=${Linking.createURL("/?")}`
          `${url}`
        );
      }

      // https://github.com/expo/expo/issues/5555
      if (Platform.OS === "ios") {
        _removeLinkingListener();
      }

      setState({ result });
      console.log(state)
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const _openIOSGoogleBrowserAsync = async () => {
    const url = getIOSGoogleOAuthURL()

    try {
      _addLinkingListener();
      let result
      if(Platform.OS === "web") {
        // result = await Linking.openURL(
          // We add `?` at the end of the URL since the test backend that is used
          // just appends `authToken=<token>` to the URL provided.
          // `${url}?linkingUri=${Linking.createURL("/?")}`
        //   `${url}`
        // );
        handleGoogle()
      } else {
        result = await WebBrowser.openBrowserAsync(
          // We add `?` at the end of the URL since the test backend that is used
          // just appends `authToken=<token>` to the URL provided.
          // `${url}?linkingUri=${Linking.createURL("/?")}`
          url
        );
      }

      // https://github.com/expo/expo/issues/5555
      if (Constants.platform.ios) {
        _removeLinkingListener();
      }

      setState({ result });
      console.log(state)
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const _addLinkingListener = () => {
    Linking.addEventListener("url", _handleRedirect);
  };

  const _removeLinkingListener = () => {
    Linking.removeEventListener("url", _handleRedirect);
    // _handleRedirect.remove();
  };

  const _maybeRenderRedirectData = () => {
    if (!state.redirectData) {
      return;
    }

    return (
      <Text style={{ marginTop: 30 }}>
        {JSON.stringify(state.redirectData)}
      </Text>
    );
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "558789760835-92o8trq1qdj0fufq0iq39lmta149dth6.apps.googleusercontent.com",
    webClientId:
      "558789760835-323i1n243blve75l9hg3r20fm1eh1cr0.apps.googleusercontent.com",
    iosClientId:
      "558789760835-1lj3eem8sprhljffvdsrft6268hqn0bf.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    client_secret: "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",
    grant_type: "authorization_code",
  });
  const handleGoogle = async () => {
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
    promptAsync({ useProxy: true, redirectUri });
  };
  useEffect(() => {
    if (response?.type === "success") {
      // const { authentication } = response;
      const authentication = response;

      // const access_token = authentication.accessToken;
      // console.log("access_token", access_token);
      // const id_token = authentication;
      // console.log("id_token", id_token);
      console.log("authentication", authentication);

      // dispatch(googleAuth(token)).then((data) => {
      //   if (data.meta.requestStatus == "rejected") {
      //     return setWrongUserAlert(true);
      //   }
      // });
    }
  }, [response]);

  return (
    <View style={styles.gView}>
      {Platform.OS !== "web" &&
      <Pressable style={styles.gButton} onPress={() => handleGoogle()}>
        <View>
          <Image source={googleLogo} style={styles.gImage} />
        </View>
        <View>
          <Text style={styles.gText}>Login con Google</Text>
        </View>
      </Pressable>}
      {Platform.OS === "web" &&
      <Pressable style={styles.gButton} onPress={() => _openWebGoogleBrowserAsync()}>
        <View>
          <Image source={googleLogo} style={styles.gImage} />
        </View>
        <View>
          <Text style={styles.gText}>Login con Google</Text>
        </View>
      </Pressable>
      }
      {_maybeRenderRedirectData()}
    </View>
  );
}

const styles = StyleSheet.create({
  gView: {
    height: 65,
    width: 200,
    justifyContent: "center",
  },
  gButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
  },
  gImage: {
    height: 50,
    width: 50,
    marginLeft: 6,
  },
  gText: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 6,
    padding: 6,
  },
});
