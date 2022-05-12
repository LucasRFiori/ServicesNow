import React from "react";
import { View, Button, TextInput, Pressable, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from "../styles/globalStyles";
import { styles } from "./style";
import Logo from '../../../assets/images/Logo.svg'
import FacebookIcon from '../../../assets/images/FacebookIcon.svg'
import GoogleIcon from '../../../assets/images/GoogleIcon.svg'
import * as AuthSession from 'expo-auth-session'

type AuthResponse = {
  type: string;
  params : {
    access_token: string;
  }
}
export function LoginPage() {
  const navigation = useNavigation();

  async function handleSignIn() {
    const CLIENT_ID = '826174763614-d033c2e19v5sgulo2upb5p1ltab70fga.apps.googleusercontent.com';
    const REDIRECT_URL = 'https://auth.expo.io/@lucasfiori/services-now';
    const RESPONSE_TYPE = 'token';
    const SCOPE = encodeURI('profile email');


    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    const { type, params } = await AuthSession
    .startAsync({ authUrl }) as AuthResponse;

    if(type === 'success') {
      navigation.navigate("ListAnnouncement", { token: params.access_token })
    }
  }

  return(
    <View style={globalStyles.main}>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <View style={styles.loginInputContainer}>
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

          <View style={styles.orTextContainer}>
            <Text style={styles.orText}>Or</Text>
          </View>

          <View style={styles.socialNetworkButtons}>
            <Pressable style={styles.facebookBtn}>
              <FacebookIcon />
              <Text style={styles.facebookBtnText}>Login with Facebook</Text>
            </Pressable>

            <Pressable style={styles.googleBtn} onPress={handleSignIn}>
              <GoogleIcon width="30" height="60"/>
              <Text style={styles.googleBtnText}>Login with Google</Text>
            </Pressable>

            <Pressable style={styles.createAccButton}>
              <Text style={styles.createAccButtonText}>Create account</Text>
            </Pressable>
          </View>
        </View>
        {/* <Button 
          title="Ir para pagina B"
          onPress={openScreen}
        /> */}
      </View>
    </View>
  )
}