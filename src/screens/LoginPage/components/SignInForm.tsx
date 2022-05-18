import React from "react";
import { Pressable, TextInput, Text } from "react-native";
import { styles } from "../style";

export function SignInForm() {
  return (
    <>
      <TextInput
        style={[styles.loginInputStyle, styles.firstInput]}
        placeholder="E-mail"
        placeholderTextColor="#888888"
      />
      <TextInput
        style={styles.loginInputStyle}
        placeholder="Password"
        placeholderTextColor="#888888"
      />

      <Pressable style={styles.forgotPassBtn}>
        <Text style={styles.forgotPassText}>Forgot my password</Text>
      </Pressable>

      <Pressable style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>Login</Text>
      </Pressable>
    </>
  )
}