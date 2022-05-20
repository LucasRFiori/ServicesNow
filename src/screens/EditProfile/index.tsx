import React from 'react'
import { View } from 'react-native'
import GoBackButton from '../CreateAccount/GoBackButton'
import { globalStyles } from '../styles/globalStyles'
import EditProfileForm from './EditProfileForm'

export function EditProfile() {
  return (
    <>
      <GoBackButton />
      <EditProfileForm />
    </>
  )
}
