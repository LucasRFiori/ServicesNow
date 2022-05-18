import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { style } from "./style"
import { globalStyles } from "../styles/globalStyles";
import GoBackButton from "./GoBackButton";
import { CheckBox } from "react-native-elements";
import { CheckBoxTerms } from "./CheckBoxTerms";

export function CreateAccount() {
  const [isSelected, setSelected] = useState(false)

  function handleIsAcceptedTerms() {
    setSelected(!isSelected)
  }

  return (
    <>
      <GoBackButton />
      <View style={globalStyles.main}>
        <Text style={style.h1}>CREATE ACCOUNT</Text>
        <View style={globalStyles.container}>
          <View style={style.nameInputContainer}>
            <TextInput style={[style.input, style.inputName]} placeholder="First Name *"></TextInput>
            <TextInput style={[style.input, style.inputName]} placeholder="Last Name *"></TextInput>
          </View>
          <View>
            <TextInput style={style.input} placeholder="Email *"></TextInput>
          </View>
          <TextInput style={style.input} secureTextEntry={true} placeholder="Password *" />

          <CheckBoxTerms handleIsAcceptedTerms={handleIsAcceptedTerms} isSelected={isSelected}/>
          
          {isSelected && (
            <Pressable style={style.createAccBtn}>
            <Text style={{ color: '#fff', fontWeight: '500'}}>CREATE ACCOUNT</Text>
          </Pressable>
          )}
        </View>
      </View>
    </>
  )
}