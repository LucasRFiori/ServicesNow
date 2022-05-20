import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { style } from "./style";
import { Gear, SignOut, UserCircle } from "phosphor-react-native";
import auth, { firebase, FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

export function Header() {
  const [userProfile, setUserProfile] = useState({} as FirebaseAuthTypes.User)
  const navigation = useNavigation();

  
  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setUserProfile(user)
    }

    navigation.addListener("state", () => {
      const user = firebase.auth().currentUser;
      if (user) {
        setUserProfile(user)
      }
      console.log('rendered')
    })
  }, [])


  async function handleLogout() {
    try{
      await auth().signOut()
      navigation.navigate("LoginPage")
    }catch(err : any){
      console.log(err)
    }
  } // Logout

  function goToEditProfile() {
    navigation.navigate("EditProfile")
  }

  return(
    <View style={style.headerMain}>
      <View style={style.userInfoContainer}>
        {userProfile.photoURL ? (
          <Image 
          source={
            { uri: userProfile.photoURL }
          } 
          style={{height: 45, width: 45, borderRadius: 25}}
        />
        ) : <UserCircle size={45} weight={"light"} color="#fff" />}
        <Text style={style.helloUser}>Hey, </Text>
        <Text style={style.userName}>{userProfile.displayName?.split(" ")[0]}</Text>
      </View>
      <View style={style.manageIconsContainer}>
        <Pressable onPress={goToEditProfile}>
          <Gear size={45} color="#fff"/>
        </Pressable>
        <Pressable style={style.signinOutBtn} onPress={handleLogout}>
          <SignOut size={45} color="#fff"/>
        </Pressable>
      </View>
    </View>
  )
}