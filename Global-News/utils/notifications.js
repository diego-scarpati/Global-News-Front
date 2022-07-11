import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert, Platform } from "react-native";
import Constants from "expo-constants";

export const getToken = async () => {
  if (!Device.isDevice) {
    Alert.alert(
      "Debes utilizar un dispositivo fisico para utilizar las notificaciones"
    );
    return;
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    Alert.alert("Debes dar permiso para acceder a las notificaciones");
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;

  if (Platform.OS == "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#ff231f7c",
    });
  }
  return token;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const startNotifications = (notificationListener, responseListener) => {
  notificationListener.current = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log(notification);
    }
  );
  responseListener.current =
    Notifications.addNotificationResponseReceivedListener((notification) => {
      console.log(notification);
    });
  return () => {
    Notifications.removeNotificationSubscription(notificationListener);
    Notifications.removeNotificationSubscription(responseListener);
  };
};

export const sendPushNotification = async (message) => {
  let response = false;
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  }).then(() => (response = true));
  return response;
};

export const setNotificationMessage = (token, title, body, data) => {
  const message = {
    to: token,
    sound: "default",
    body: body,
    data: data,
  };
  return message;
};
