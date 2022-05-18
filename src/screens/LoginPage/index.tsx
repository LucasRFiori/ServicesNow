import React from "react";
import { View, Text } from 'react-native'
import { globalStyles } from "../styles/globalStyles";
import { styles } from "./style";
import { Logo } from "./components/Logo";
import { SignInForm } from "./components/SignInForm";
import { SignInSocials } from "./components/SignInSocials";
import { CreateAccountButton } from "./components/CreateAccountButton";


export function LoginPage() {
  return(
    <View style={globalStyles.main}>
      <View style={globalStyles.container}>
        <Logo />
        <View style={styles.loginInputContainer}>
          
          <SignInForm />

          <View style={styles.orTextContainer}>
            <Text style={styles.orText}>Or</Text>
          </View>

          <SignInSocials  />

          <CreateAccountButton />

        </View>
        {/* <Button 
          title="Ir para pagina B"
          onPress={openScreen}
        /> */}
      </View>
    </View>
  )
}