import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, Text } from "react-native";
import { styles } from "../style";

export function CreateAccountButton() {
  const navigation = useNavigation();

  function handleToCreateAccountPage() {
    navigation.navigate('CreateAccount', { token: 'NoGoogleLogin'})
  }

  return (
    <Pressable style={styles.createAccButton} onPress={handleToCreateAccountPage}>
      <Text style={styles.createAccButtonText}>Create account</Text>
    </Pressable>
  )
}