// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyArapUSqwZC5_WuM9yNUHIQ8e5CNBEdtBM",
  authDomain: "zoya-waitlist.firebaseapp.com",
  projectId: "zoya-waitlist",
  storageBucket: "zoya-waitlist.appspot.com",
  messagingSenderId: "396345237283",
  appId: "1:396345237283:web:ceb98aa3a2cf87f4bd3696",
  measurementId: "G-6QS80Y5X4B",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Function to get FCM token
export const requestFirebaseNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BESw0Ckr4ZuNdQkY1JzTzWP9TNctCnHg14PIVZpMO_h1MpZKGVNX7fPSO6tPRcZfsWr0QeeHfGXwTsKAyNTX4rY", // Replace with your key from Firebase Console
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("Notification permission denied");
      return null;
    }
  } catch (error) {
    console.error("FCM error:", error);
    return null;
  }
};

// Listen for incoming messages while app is in foreground
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
