import React from "react";
import { Pressable, View, Text } from "react-native";
import { styles } from "../style";
import FacebookIcon from '../../../../assets/images/FacebookIcon.svg'
import GoogleIcon from '../../../../assets/images/GoogleIcon.svg'
import { useNavigation } from "@react-navigation/native";
import * as AuthSession from 'expo-auth-session'

type AuthResponse = {
  type: string;
  params : {
    access_token: string;
  }
}

export function SignInSocials() {

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
      navigation.navigate("CreateAccount", { token: params.access_token })
    }
  }
  
  return (
    <View style={styles.socialNetworkButtons}>
      <Pressable style={styles.facebookBtn}>
        <FacebookIcon />
        <Text style={styles.facebookBtnText}>Login with Facebook</Text>
      </Pressable>

      <Pressable style={styles.googleBtn} onPress={handleSignIn}>
        <GoogleIcon width="30" height="60"/>
        <Text style={styles.googleBtnText}>Login with Google</Text>
      </Pressable>
    </View>
  )
}