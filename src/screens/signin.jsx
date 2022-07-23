import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
// import Button from "../components/Button";
import Input from "../components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../App";
import Button from "../components/Button";
import RadioInput from "../components/radio-input";

export default function Signin({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((res) =>
      console.log(res)
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../assets/login.jpg")}
        style={{ alignSelf: "center", height: 300 }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
        never forgot your notes
      </Text>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
      >
        <Button
          title={"Login"}
          customStyles={{ alignSelf: "center", marginBottom: 60 }}
          onPress={login}
        />
        {/* <Button
          onPress={login}
          title="Log In"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        /> */}
        <Pressable
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>
            Don't have an account?{" "}
            <Text style={{ color: "green", fontWeight: "bold" }}>Sign Up</Text>{" "}
          </Text>
        </Pressable>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 25,
  },
});
