import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { style } from "./style";
import { CaretLeft, Gear, SignOut, UserCircle } from "phosphor-react-native";
import auth, { firebase, FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore'

type HeaderProps = {
  isFirstPage?: boolean;
}
export function Header({isFirstPage}: HeaderProps) {
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
        firestore()
          .collection('users')
          .doc(user.uid)
          .update({
            email: user.email,
            firstname: user.displayName?.split(" ")[0],
            image: user.photoURL,
            lastname: user.displayName?.split(" ")[1],
            phone: user.phoneNumber,
            uid: user.uid
          })
      }
    })
  }, [])


  async function handleLogout() {
    try{
      await auth().signOut()
      navigation.navigate("LoginPage")
    }catch(err : any){
    }
  }

  function goToEditProfile() {
    navigation.navigate("EditProfile")
  }

  function handleGoBack() {
    navigation.goBack()
  }

  return(
    <View style={style.headerMain}>
      <View style={style.userInfoContainer}>
      {!isFirstPage && (
        <Pressable onPress={handleGoBack} style={{marginRight: 10}}>
          <CaretLeft size={32} color="#fff"/>
        </Pressable>)}
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