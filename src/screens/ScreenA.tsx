import React from "react";
import { View, Button } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type StackParamList = {
  screenA: undefined;
  screenB: undefined;
}

type StackProps = NativeStackScreenProps<StackParamList, 'screenA'>

type Props = {
  routes : StackProps
}
export function ScreenA({ routes } : Props) {

  function openScreen() {
    const { navigation } = routes
    navigation.navigate('screenB')
  }

  return(
    <View style={{ flex: 1, backgroundColor: 'red', justifyContent: "center"}}>

      <Button 
        title="Ir para pagina B"
        onPress={openScreen}
      />
    </View>
  )
}