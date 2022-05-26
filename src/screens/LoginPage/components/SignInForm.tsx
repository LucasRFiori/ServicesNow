import React, { useState } from "react";
import { Pressable, TextInput, Text, Alert } from "react-native";
import { styles } from "../style";
import auth from '@react-native-firebase/auth'
import { useNavigation } from "@react-navigation/native";

export function SignInForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigation()

  function isValidEmail(email: string) {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      return true
    }

    return false
  }
  
  async function handleSignInWithEmailAndPassword() {
    if(isValidEmail(email) && password.length > 1){
      try {
        const { user } = await auth().signInWithEmailAndPassword(email, password)
        setTimeout(() => {
          navigate.navigate("ListAnnouncement")
        }, 500) // await signIn
      }catch(e: any){
        console.log(e)
        if(e.code == 'auth/user-not-found') {
          Alert.alert('User not found!')
          return
        }
        if(e.code == 'auth/wrong-password') {
          Alert.alert('Wrong password!')
          return
        }

        Alert.alert(e.code)
      }
    }else {
      Alert.alert('Email or password are incorrets!')
    }
  }

  return (
    <>
      <TextInput
        style={[styles.loginInputStyle, styles.firstInput]}
        placeholder="E-mail"
        keyboardType="email-address"
        placeholderTextColor="#888888"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.loginInputStyle}
        placeholder="Password"
        placeholderTextColor="#888888"
        onChangeText={setPassword}
        secureTextEntry={true} 
      />

      <Pressable style={styles.forgotPassBtn}>
        <Text style={styles.forgotPassText}>Forgot my password</Text>
      </Pressable>

      <Pressable style={styles.loginBtn} onPress={handleSignInWithEmailAndPassword}>
        <Text style={styles.loginBtnText}>Login</Text>
      </Pressable>
    </>
  )
}