import { View, Text, Image, Alert, Pressable, Keyboard } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Photo } from "../EditProfile/components/Photo";
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage'
import { FlatList, ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Box, BoxTwo, Input, InputSizeDiv, Span, TextArea, CreateAnnounceButton, WhiteContainer } from "./style";
import { Header } from "../components/GlobalComponents/Header";
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from "@react-navigation/native";

export function CreateAnnounce() {
  const navigation = useNavigation()
  const [images, setImages] = useState<string[]>([])
  const imagesUrl = [] as string[]
  const [title, setTitle] = useState<string>('')
  const [initialDate, setInitialDate] = useState<string>('')
  const [finalDate, setFinalDate] = useState<string>('')
  const [fromPrice, setFromPrice ] = useState<string>('')
  const [toPrice, setToPrice] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  async function handlePickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status == 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.cancelled) {
        setImages([...images, result.uri]);
      }
    }
  };

  function handleCreateAnnounce() {
    firestore()
    .collection('announcements')
    .add({
      createdAt: new Date().getTime(),
      Title: title,
      InitialDate: initialDate,
      FinalDate: finalDate,
      FromPrice: fromPrice ? fromPrice : null,
      ToPrice: toPrice,
      Description: description,
      Images: imagesUrl
    }).then(() => {
      console.log(imagesUrl)
      Alert.alert('Announce created.')
      navigation.navigate("ListAnnouncement")
    })
  }

  function handleUpload() {
    const promises: FirebaseStorageTypes.Task[] = [];
    let i = 0
    images.forEach((image, index) => {
      const fileName = Math.ceil(Math.random() * 50000)
      const reference = storage().ref(`/announceImages/${fileName}.png`)
      const uploadTask = reference.putFile(image);
      promises.push(uploadTask);

      uploadTask.then(async () => {
        const imageUrl = await reference.getDownloadURL();
        imagesUrl.push(imageUrl)
        i++;
        if(i === images.length){
          handleCreateAnnounce()
        }
      })
    })
  }

  return(
    <>
    <Header isFirstView={true}/>
    <View style={globalStyles.main}>
          <View style={{
            flexDirection: "row",
            alignItems: "center"
          }}>
            <Photo onPress={handlePickImage} />
          {images && (
            <FlatList 
            data={images} 
            horizontal
            renderItem={(image) => {
              return <Image 
                style={{width: 140, height: 140, marginTop: 20}} 
                source={{
                  uri: image.item
                }}
                resizeMode="cover"
              /> 
            }}
            />
          )}
        </View>
        <ScrollView contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}>
        <WhiteContainer>
          <Box>
            <Span>Title</Span>
            <Input placeholder="Insert announce title" onChangeText={setTitle}/>
          </Box>
          <Box>
            <Span>Date</Span>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <BoxTwo>
                <Text>Initial Date</Text>
                <InputSizeDiv onChangeText={setInitialDate}/>
              </BoxTwo>
              <BoxTwo>
                <Text>Final Date</Text>
                <InputSizeDiv onChangeText={setFinalDate}/>
              </BoxTwo>
            </View>
          </Box>
          <Box>
            <Span>Price Table</Span>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <BoxTwo>
                <Text>From</Text>
                <InputSizeDiv placeholder="$" onChangeText={setFromPrice}/>
              </BoxTwo>
              <BoxTwo>
                <Text>To</Text>
                <InputSizeDiv placeholder="$" onChangeText={setToPrice}/>
              </BoxTwo>
            </View>
          </Box>
          <Box>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Span>Description</Span>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TextArea 
              placeholder="Insert description here..."
              multiline
              onChangeText={setDescription}
              />
            </View>
          </TouchableWithoutFeedback>
          </Box>
          <Box>
            <CreateAnnounceButton onPress={handleUpload}>
              <Text style={{ fontSize: 15,color: '#fff', fontWeight: "600"}}>Create Announce</Text>
            </CreateAnnounceButton>
          </Box>
        </WhiteContainer>
        </ScrollView>
    </View>
    </>
  )
}