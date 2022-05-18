import React from 'react'
import { View } from 'react-native'
import { CheckBox } from 'react-native-elements'

type CheckBoxTerms = {
  handleIsAcceptedTerms: () => void;
  isSelected: boolean
}

export function CheckBoxTerms({ handleIsAcceptedTerms, isSelected }: CheckBoxTerms) {
  return (
    <View style={{alignItems: "center"}}>
      <CheckBox 
        title="I accept the terms and conditions *"
        checkedIcon="check"
        uncheckedIcon="square-o"
        uncheckedColor="#fff"
        checked={isSelected}
        onPress={handleIsAcceptedTerms}
        containerStyle={{backgroundColor: 'transparent', borderColor: 'transparent'}}
        textStyle={{color: '#fff'}}
      />
    </View>
  )
}
