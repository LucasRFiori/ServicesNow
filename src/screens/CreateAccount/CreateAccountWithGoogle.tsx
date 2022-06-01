import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Pressable, Alert } from 'react-native'
import { globalStyles } from '../styles/globalStyles'
import { CheckBoxTerms } from './CheckBoxTerms'
import { style } from './style'
import auth from '@react-native-firebase/auth'
import { CaretLeft } from 'phosphor-react-native'
import * as AuthSession from 'expo-auth-session'
import firestore from '@react-native-firebase/firestore'

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

type Params = {
  token: string;
}

export function CreateAccountWithGoogle() {
  const [userImage, setUserImage] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSelected, setSelected] = useState(false)

  const navigation = useNavigation();
  const route = useRoute();

  const { token } = route.params as Params

  async function loadProfile() {
    const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`)
    const userInfo: Profile = await response.json();

    setUserImage(userInfo.picture)
    setFname(userInfo.given_name)
    setLname(userInfo.family_name)
    setEmail(userInfo.email)
  }

  useEffect(() => {
    loadProfile();
  }, [])
  
  function handleIsAcceptedTerms() {
    setSelected(!isSelected)
  }

  async function createUserDocument(
    email: string | null, 
    firstname?: string | null, 
    image ?: string | null,
    lastname?: string | null, 
    uid?: string ) {
      await firestore()
      .collection('users')
      .doc(uid)
      .set({
        createdAt: new Date(),
        email: email,
        firstname: firstname,
        image: image,
        lastname: lastname,
        phone: '',
        uid: uid
      })
  }

  function handleCreateUserAccount() {
    if(fname.trim().length > 1 && lname.trim().length > 1 && password.length >= 6){
      auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        res.user.updateProfile({
          displayName: fname + ' '+ lname,
          photoURL: userImage
        }),
        createUserDocument(
          res?.user?.email,
          fname,
          userImage,
          lname,
          res.user.uid
        ).then(() => {
          navigation.navigate("LoginPage")
          Alert.alert('Account created!')
        })
      }
      ).catch(err => {
        switch(err.code) {
          case 'auth/email-already-exists':
            Alert.alert('Email Already Exists!')
          case 'auth/invalid-email':
            Alert.alert('Invalid Email')
          case 'auth/invalid-password':
            Alert.alert('Invalid password must be 6 characters')
          case 'auth/email-already-in-use':
            Alert.alert('Email already in use!')
        }
      })
    }else {
      Alert.alert('All fields are mandatory.')
    }
  }
  
  async function handleGoBack() {
    try {
      await AuthSession.revokeAsync({ token }, { revocationEndpoint: 'https://oauth2.googleapis.com/revoke' });

      navigation.goBack()
    } catch (error) {
    }
  }


  return (
    <>
    <View style={style.createAccHeader}>
      <Pressable onPress={handleGoBack}>
        <CaretLeft size={32} color="#fff"/>
      </Pressable>
    </View>
      <View style={globalStyles.main}>
        <Text style={style.h1}>CREATE ACCOUNT</Text>
        <View style={globalStyles.container}>
          <View style={style.nameInputContainer}>
            <TextInput 
              style={[style.input, style.inputName]} 
              placeholder="First Name *"
              onChangeText={setFname}
              defaultValue={fname}
            />
            <TextInput 
              style={[style.input, style.inputName]} 
              placeholder="Last Name *" 
              onChangeText={setLname}
              defaultValue={lname}
            />
          </View>
          <View>
            <TextInput 
              style={style.input} 
              placeholder="Email *" 
              onChangeText={setEmail}
              defaultValue={email}
            />
          </View>

          <TextInput 
            style={style.input} 
            secureTextEntry={true} 
            placeholder="Password *" 
            onChangeText={setPassword}
          />

          <CheckBoxTerms handleIsAcceptedTerms={handleIsAcceptedTerms} isSelected={isSelected}/>
          
          {isSelected && (
            <Pressable style={style.createAccBtn} onPress={handleCreateUserAccount}>
            <Text style={{ color: '#fff', fontWeight: '500'}}>CREATE ACCOUNT</Text>
          </Pressable>
          )}
        </View>
      </View>
    </>
  )
}
