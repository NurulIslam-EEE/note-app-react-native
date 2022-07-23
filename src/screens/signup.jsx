import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import Button from "../components/Button";
import Input from "../components/input";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../App";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { showMessage, hideMessage } from "react-native-flash-message";
import RadioInput from "../components/radio-input";
import Button from "../components/Button";
const genderOption = ["Male", "Female"];

export default function Signup() {
  const [loading, setLoading] = React.useState(false);
  const [gender, setGender] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [age, setAge] = React.useState("");
  const [name, setName] = React.useState("");
  console.log(email, password);
  const signUp = async () => {
    console.log(email, password);
    // 1-create a new user
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await addDoc(collection(db, "user"), {
        name: name,
        email: email,
        age: age,
        gender: gender,
        uid: result.user.uid,
      });
      setLoading(false);
      console.log(result);
    } catch (error) {
      showMessage({
        message: "error",
        type: "danger",
      });
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          placeholder="Email address"
          autoCapitalize={"none"}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Full Name"
          autoCapitalize={"words"}
          onChangeText={(text) => setName(text)}
        />
        <Input placeholder="Age" onChangeText={(text) => setAge(text)} />
        <View style={{ marginVertical: 20 }}>
          <Text>Select Gender</Text>
        </View>

        
       {genderOption.map((option,index)=> <RadioInput
            key={index}
            label={option}
            value={gender}
            setValue={setGender}
            
          />)}
        {genderOption.map((option, index) => {
          const selected = option === gender;
          <Pressable
            key={option}
            onPress={() => setGender(option)}
            style={styles.radioContainer}
          >
            <View
              style={[
                styles.outerCircle,
                selected && styles.selectedOuterCircle,
              ]}
            >
              <View
                style={[
                  styles.innerCircle,
                  selected && styles.selectedInnerCircle,
                ]}
              ></View>
            </View>
            <Text style={styles.radioText}>{option}</Text>
          </Pressable>;
        })}
      </View>
      <View>
      
          
       
      </View>
    
      <View
        style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
      >
        <Button
          title={"Sign Up"}
          customStyles={{ alignSelf: "center", marginBottom: 60 }}
          onPress={signUp}
        />
        {/* <Button
          onPress={signUp}
          title="Sign Up"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        /> */}

        <Pressable>
          <Text>
            Already have an account?{" "}
            <Text style={{ color: "green", fontWeight: "bold" }}>Sign In</Text>{" "}
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
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "red",
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
  radioText: {
    marginLeft: 15,
  },
  selectedOuterCircle: {
    borderColor: "orange",
  },
  selectedInnerCircle: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
});
