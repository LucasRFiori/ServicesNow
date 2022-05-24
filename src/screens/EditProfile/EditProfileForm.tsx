import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, Pressable, Alert } from 'react-native'
import { style } from './style'
import { globalStyles } from '../styles/globalStyles'
import * as ImagePicker from 'expo-image-picker';
import { Photo } from '../EditProfile/components/Photo'
import * as Permissions from 'expo-permissions'
import { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth';;
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'

export default function EditProfileForm() {
  const [image, setImage] = useState('');
  const [userProfile, setUserProfile] = useState({} as FirebaseAuthTypes.User)
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isSelected, setSelected] = useState(false)

  const navigation = useNavigation()

  function handleIsAcceptedTerms() {
    setSelected(!isSelected)
  }

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  async function recoveryCurrentUserInformations() {
    const user = await firebase.auth().currentUser;
    if (user) {
      setUserProfile(user)
    }
  }

  function handleUpdateUserAccount() {
    if(fname?.trim().length >= 2 && lname.trim().length >= 2) {
      firebase.auth().currentUser?.updateProfile({
        displayName: fname?.trim() + ' ' + lname,
        photoURL: image
      }).then(resp =>{
        Alert.alert('Successfully updated!')
        navigation.goBack()
      }).catch(err => {
        console.log(err)
      })
    }else{
      Alert.alert("Invalid Name")
    }

    firestore()
      .collection('users')
      .doc(userProfile.uid)
      .update({
        email: userProfile.email,
        firstname: fname.trim(),
        image: userProfile.photoURL,
        lastname: lname.trim(),
        phone: userProfile.phoneNumber,
        uid: userProfile.uid
      }).then(res => {
        
      }).catch(err => {
        console.log('DOC = ', err)
      })
  }

  useEffect(() => {
    recoveryCurrentUserInformations();
    if(userProfile.displayName) {
      setFname(userProfile.displayName.split(' ')[0])
      setLname(userProfile.displayName.split(' ')[1])
    }
    if(userProfile.email) {
      setEmail(userProfile.email)
    }
    if(userProfile.phoneNumber) {
      setPhone(userProfile.phoneNumber)
    }
    if(userProfile.photoURL) {
      setImage(userProfile.photoURL)
    }
  }, [userProfile])

  return (
    <>
      <View style={globalStyles.main}>
        <Text style={style.h1}>EDIT PROFILE</Text>
        <Photo uri={image} onPress={handlePickImage} />
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
                editable={false}
              />
              <TextInput
                style={style.input}
                placeholder="+55 Phone *"
                onChangeText={setPhone}
                defaultValue={phone}
              />
            </View>
            <View style={{alignItems: "center"}}>
              <CheckBox 
                title="I want to update my informations *"
                checkedIcon="check"
                uncheckedIcon="square-o"
                uncheckedColor="#fff"
                checked={isSelected}
                onPress={handleIsAcceptedTerms}
                containerStyle={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                textStyle={{color: '#fff'}}
              />
          </View>
          {isSelected && (
            <Pressable style={style.updateAccountBtn} onPress={handleUpdateUserAccount}>
              <Text style={{ color: '#fff', fontWeight: '500'}}>UPDATE INFORMATIONS</Text>
            </Pressable>
          )}
        </View>
      </View>
    </>
  )
}
