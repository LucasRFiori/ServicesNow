import { View, Text, Image, Alert, Pressable, Keyboard } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Photo } from "../EditProfile/components/Photo";
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage'
import { FlatList, ScrollView, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Box, BoxTwo, Input, InputSizeDiv, Span, TextArea, CreateAnnounceButton, WhiteContainer } from "./style";
import { Header } from "../components/GlobalComponents/Header";
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MaskInput, { createNumberMask } from 'react-native-mask-input';

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
  const [isDatePickerOneVisible, setDatePickerOneVisibility] = useState(false);
  const [isDatePickerTwoVisible, setDatePickerTwoVisibility] = useState(false);

  const dollarMask = createNumberMask({
    prefix: ['$', ' '],
    delimiter: '.',
    separator: ',',
    precision: 2,
  })

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
    if(title && initialDate && finalDate
      && toPrice) {
        const promises: FirebaseStorageTypes.Task[] = [];
        let i = 0
        images.forEach((image) => {
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
      }else {
        Alert.alert('Verify mandatory fields (Title, Dates, To Price)')
      }
  }

  const handleDateOnePicker = () => {
    setDatePickerOneVisibility(!isDatePickerOneVisible);
  };

  const handleDateTwoPicker = () => {
    setDatePickerTwoVisibility(!isDatePickerTwoVisible);
  };

  const handleConfirmInitialDate = (date: Date) => {
    let formatDateToBr = (date.getDate() <= 9 ? '0' + (date.getDate()) : (date.getDate())) + "/" + (date.getMonth() <= 9 ? '0' + ( date.getMonth() + 1) : (date.getMonth() + 1)) + "/" + date.getFullYear(); 
    setInitialDate(formatDateToBr)
    handleDateOnePicker();
  };

  const handleConfirmFinalDate = (date: Date) => {
    let formatDateToBr = (date.getDate() <= 9 ? '0' + (date.getDate()) : (date.getDate())) + "/" + (date.getMonth() <= 9 ? '0' + ( date.getMonth() + 1) : (date.getMonth() + 1)) + "/" + date.getFullYear(); 
    setFinalDate(formatDateToBr)
    handleDateTwoPicker();
  };

  return(
    <>
    <Header />
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
                <Pressable onPress={handleDateOnePicker}>
                  <InputSizeDiv editable={false} defaultValue={initialDate} style={{color: '#000'}}/>
                </Pressable>
                  <DateTimePickerModal
                  isVisible={isDatePickerOneVisible}
                  mode="date"
                  date={new Date()}
                  onConfirm={handleConfirmInitialDate}
                  onCancel={handleDateOnePicker}
                  />
              </BoxTwo>
              <BoxTwo>
                <Text>Final Date</Text>
                <Pressable onPress={handleDateTwoPicker}>
                  <InputSizeDiv editable={false} defaultValue={finalDate} style={{color: '#000'}}/>
                </Pressable>
                  <DateTimePickerModal
                  isVisible={isDatePickerTwoVisible}
                  mode="date"
                  date={new Date()}
                  onConfirm={handleConfirmFinalDate}
                  onCancel={handleDateTwoPicker}
                  />
              </BoxTwo>
            </View>
          </Box>
          <Box>
            <Span>Price Table</Span>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <BoxTwo>
                <Text>From</Text>
                <MaskInput
                value={fromPrice}
                mask={dollarMask}
                onChangeText={(masked, unmasked) => {
                  setFromPrice(masked)
                }}
                style={{
                  height: 40,
                  paddingLeft: 5,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5
                }}
              />
              </BoxTwo>
              <BoxTwo>
                <Text>To</Text>
                <MaskInput
                value={toPrice}
                mask={dollarMask}
                onChangeText={(masked, unmasked) => {
                  setToPrice(masked)
                }}
                style={{
                  height: 40,
                  paddingLeft: 5,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5
                }}
              />
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