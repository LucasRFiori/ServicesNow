import React, { useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { style } from "./style"
import { globalStyles } from "../styles/globalStyles";
import GoBackButton from "./GoBackButton";
import { CheckBoxTerms } from "./CheckBoxTerms";
import { useRoute } from "@react-navigation/native";
import { CreateAccountWithEmailAndPass } from "./CreateAccountWithEmailAndPass";
import { CreateAccountWithGoogle } from "./CreateAccountWithGoogle";

type Params = {
  token: string;
}

export function CreateAccount() {
  const route = useRoute();

  const { token } = route.params as Params



  return (
    <>
      {token === 'NoGoogleLogin' ? (
        <>
          <GoBackButton />
          <CreateAccountWithEmailAndPass />
        </>
      ) : <CreateAccountWithGoogle />}
    </>
  )
}