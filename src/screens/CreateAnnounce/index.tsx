import { View, Text, Image, Alert, Pressable } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Photo } from "../EditProfile/components/Photo";
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage'

export function CreateAnnounce() {
  const [image, setImage] = useState<string[]>([])
  const [imagesUrl, setImagesUrl] = useState<string[]>([])

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage([...image, result.uri]);
      }
    }
  };

  async function handleUpload() {
    const promises: FirebaseStorageTypes.Task[] = [];
    image.map((image) => {
      const fileName = Math.ceil(Math.random() * 50000)
      const reference = storage().ref(`/announceImages/${fileName}.png`)
      const uploadTask = reference.putFile(image);
      promises.push(uploadTask);

      uploadTask.then(async () => {
        const imageUrl = await reference.getDownloadURL();
        setImagesUrl([...imagesUrl, imageUrl])
        console.log(imageUrl)
      })
    })

    Promise.all(promises).then(() => Alert.alert('Acabou o upload'))
  }

  return(
    <>
    <Photo onPress={handlePickImage} />
    {image && image.map((img) => (
      <Photo key={img} uri={img} style={{width: 50, height: 50}}/>
    )
    )}
    <View style={globalStyles.container}>
      <Text>Annnounce</Text>
    </View>
    <Pressable onPress={handleUpload} style={{width: 100, height: 100, backgroundColor: '#000'}}>
      <Text>UPLOAD</Text>
    </Pressable>
    </>
  )
}