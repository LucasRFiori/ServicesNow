import React from "react";
import { Pressable, Text } from "react-native";
import { styles } from "./style";

export function LoginButton() {
  return (
    <Pressable style={styles.loginBtn}>
      <Text style={styles.loginBtnText}>Login</Text>
    </Pressable>
  )
}