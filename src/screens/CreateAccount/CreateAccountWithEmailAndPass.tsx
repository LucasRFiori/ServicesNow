import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Pressable, Alert } from 'react-native'
import { globalStyles } from '../styles/globalStyles'
import { CheckBoxTerms } from './CheckBoxTerms'
import { style } from './style'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'

export function CreateAccountWithEmailAndPass() {
  const navigation = useNavigation();
  
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSelected, setSelected] = useState(false)

  function handleIsAcceptedTerms() {
    setSelected(!isSelected)
  }

  async function createUserDocument(
    email: string | null, 
    firstname?: string | null, 
    lastname?: string | null, 
    uid?: string ) {
      await firestore()
      .collection('users')
      .doc(uid)
      .set({
        createdAt: new Date(),
        email: email,
        firstname: firstname,
        image: '',
        lastname: lastname,
        phone: '',
        uid: uid
      })
  }

  function handleCreateUserAccount() {
    if(fname && lname){
      auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        res.user.updateProfile({
          displayName: fname + ' '+ lname
        })
        createUserDocument(res?.user?.email,
        fname,
        lname,
        res.user.uid
        )
        navigation.goBack()
        Alert.alert('Account created!')
      }).catch(err => {
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

  return (
    <View style={globalStyles.main}>
      <Text style={style.h1}>CREATE ACCOUNT</Text>
      <View style={globalStyles.container}>
        <View style={style.nameInputContainer}>
          <TextInput 
            style={[style.input, style.inputName]} 
            placeholder="First Name *"
            onChangeText={setFname}
          />
          <TextInput 
            style={[style.input, style.inputName]} 
            placeholder="Last Name *" 
            onChangeText={setLname}
          />
        </View>
        <View>
          <TextInput 
            style={style.input} 
            placeholder="Email *" 
            onChangeText={setEmail}
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
  )
}
