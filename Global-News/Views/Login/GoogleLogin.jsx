import Constants from 'expo-constants';
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import axios from "axios";
import storage from "../storage/storage";
import googleLogo from "../assets/google-logo.png";
import getGoogleOAuthURL from "../utils/getGoogleOAuthURL";

export default function GoogleLogin(props) {
  
  /*
  const [accessToken, setAccessToken] = useState(null)
  const [user, setUser] = useState(null)
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "558789760835-323i1n243blve75l9hg3r20fm1eh1cr0.apps.googleusercontent.com",
    iosClientId: "558789760835-1lj3eem8sprhljffvdsrft6268hqn0bf.apps.googleusercontent.com"
  })

  useEffect(()=>{
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken)
      accessToken && fetchUserInfo()
    }
  }, [response])

  async function fetchUserInfo(){
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization : `Bearer ${accessToken}`}
    })
    const userInfo = await response.json()
    setUser(userInfo)
  }
*/

  useEffect(() => {
    console.log(pedido);
  }, [result]);

  // // Prueba con linkingHandler
  // launchBrowser = async () => {
  //   this.addLinkingListener();
  //   const result = await WebBrowser.openBrowserAsync(`${uri}/?returnUri=${Linking.makeUrl("return/path")}`);
  //   this.removeLinkingListener();
  // }

  // addLinkingListener = () => {
  //   Linking.addEventListener("url", this.handleRedirect);
  // };

  // removeLinkingListener = () => {
  //   Linking.removeEventListener("url", this.handleRedirect);
  // };
  
  // handleRedirect = (event) => {
  //   WebBrowser.dismissBrowser();
  //   const redirectData = Linking.parse(event.url);
  // };

  const url = getGoogleOAuthURL();
  // console.log("Props de GoogleLogin: ", props)
  // console.log("Route Name:", props.navigation.state.routeName)
  const [pedido, setPedido] = useState(null);
  const [result, setResult] = useState(null);
  const handleBrowser = async () => {
    let result = await WebBrowser.openBrowserAsync(url);
    setResult(result);
    Linking.getInitialURL();
  };
  const handleLink = async () => {
    const url = await Linking.getInitialURL();
    return url;
  };

  const handleGoogle = async () => {
    const user = await axios.get("http://localhost:3001/api/auth/login");
    console.log("user:", user);
  };

  const promesaPress = () => {
    WebBrowser.openBrowserAsync(url).then(() =>
      axios
        .get("http://localhost:3001/api/auth/logged")
        .then((res) => setPedido(res.data))
    );
    // setPedido(Linking.openURL(url)
  };
  console.log(pedido);

  console.log("Constants.experienceUrl", Constants.experienceUrl)
  console.log("Constants.intentUri", Constants.intentUri)
  console.log("Constants.linkingUri", Constants.linkingUri)
  console.log("Constants.platform", Constants.platform)
  console.log("Constants.sessionId", Constants.sessionId)

  return (
    <View style={styles.gView}>
      {/* <Pressable style={styles.gButton} onPress={() => handlePressButtonAsync()}> */}
      {/* <Pressable style={styles.gButton} onPress={() => console.log(handleLink())}> */}
      <Pressable style={styles.gButton} onPress={() => promesaPress()}>
        {/* <Pressable style={styles.gButton} onPress={() => handleBrowser()}> */}
        {/* <Pressable style={styles.gButton} onPress={() => {
        Linking.openURL(url)
        handleGoogle()
        }}> */}
        {/* <Pressable style={styles.gButton} onPress={() => {handleGoogle()}}> */}

        {/* <Pressable style={styles.gButton} onPress={() => getGoogleOAuthURL()}> */}
        <View>
          <Image source={googleLogo} style={styles.gImage} />
        </View>
        <View>
          <Text style={styles.gText}>Login con Google</Text>
        </View>
      </Pressable>
      {/* <Pressable disabled={!request} onPress={() => promptAsync()}>
        <View>
          <Text style={styles.gText}>Login con Google</Text>
        </View>
      </Pressable> */}
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
