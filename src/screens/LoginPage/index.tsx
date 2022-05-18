import React from "react";
import { View, Text } from 'react-native'
import { globalStyles } from "../styles/globalStyles";
import { styles } from "./style";
<<<<<<< HEAD
import { Logo } from "./components/Logo";
import { SignInForm } from "./components/SignInForm";
import { SignInSocials } from "./components/SignInSocials";
import { CreateAccountButton } from "./components/CreateAccountButton";
=======
import Logo from '../../../assets/images/Logo.svg'
import FacebookIcon from '../../../assets/images/FacebookIcon.svg'
import GoogleIcon from '../../../assets/images/GoogleIcon.svg'
import * as AuthSession from 'expo-auth-session'
import { LoginButton } from "./LoginButton";
>>>>>>> e532662727d0f0d48cbbfdb9849f877e4be73f02


export function LoginPage() {
  return(
    <View style={globalStyles.main}>
      <View style={globalStyles.container}>
        <Logo />
        <View style={styles.loginInputContainer}>
<<<<<<< HEAD
          
          <SignInForm />
=======
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

          <LoginButton />
>>>>>>> e532662727d0f0d48cbbfdb9849f877e4be73f02

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