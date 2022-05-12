import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { style } from "./style";
import { useRoute, useNavigation } from '@react-navigation/native'
import { Gear, SignOut } from "phosphor-react-native";
import * as AuthSession from 'expo-auth-session'


type Params = {
  token: string;
}

type Profile = {
  email: string;
  family_name: string;
  given_name: string;
  hd: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export function Header() {
  const [profile, setProfile] = useState({} as Profile);
  const navigation = useNavigation();
  const route = useRoute();

  const { token } = route.params as Params
  
  async function loadProfile() {
    const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`)
    const userInfo = await response.json();

    setProfile(userInfo)
  }

  async function handleLogout() {
    try {
      await AuthSession.revokeAsync({ token }, { revocationEndpoint: 'https://oauth2.googleapis.com/revoke' });

      navigation.navigate("LoginPage")
    } catch (error) {
      console.log('ERROR XXX', error)
    }
  }

  useEffect(() => {
    loadProfile();
  }, [])
  return(
    <View style={style.headerMain}>
      <View style={style.userInfoContainer}>
        <Image 
        source={
          { uri: profile.picture}
        } 
        style={{height: 40, width: 40, borderRadius: 25}}
        />
        <Text style={style.helloUser}>Hey, </Text>
        <Text style={style.userName}>{profile.given_name}</Text>
      </View>
      <View style={style.manageIconsContainer}>
        <Pressable>
          <Gear size={45} color="#fff"/>
        </Pressable>
        <Pressable style={style.signinOutBtn} onPress={handleLogout}>
          <SignOut size={45} color="#fff"/>
        </Pressable>
      </View>
    </View>
  )
}