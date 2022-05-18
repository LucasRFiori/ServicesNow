import { useNavigation } from '@react-navigation/native'
import { CaretLeft } from 'phosphor-react-native'
import React from 'react'
import { Pressable, View } from 'react-native'
import { style } from './style'

export default function GoBackButton() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <View style={style.createAccHeader}>
      <Pressable onPress={handleGoBack}>
        <CaretLeft size={32} color="#fff"/>
      </Pressable>
    </View>
  )
}
