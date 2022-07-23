import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

export default function Input({
  placeholder,
  secureTextEntry = false,
  onChangeText,
  value,
  autoCapitalize,
  multiline
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText}
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
      value={value}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
    />
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
