import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import Signin from "./src/screens/signin";
import Signup from "./src/screens/signup";
import Edit from "./src/screens/update";
import Create from "./src/screens/create";
import Home from "./src/screens/home";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import FlashMessage from "react-native-flash-message";
import Update from "./src/screens/update";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTRTfanW5IWCwphYn_byYD4BLFlu0y62Y",
  authDomain: "note-app-c5a92.firebaseapp.com",
  projectId: "note-app-c5a92",
  storageBucket: "note-app-c5a92.appspot.com",
  messagingSenderId: "765595659251",
  appId: "1:765595659251:web:5e90d6660eb65f19af0086",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(false);

  //   useEffect(() => {

  // signOut(auth)
  //   },[])

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
      return authSubscription;
    });
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  }
  // const user = false;
  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create">
              {(props) => <Create {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Update" component={Update} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={Signin}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SignUp" component={Signup} />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
