import styled from 'styled-components/native'

export const Container = styled.View`
  height: 40px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 13px;
  margin-bottom: 13px;
`
export const CreateAnnouncePressable = styled.Pressable`
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  background-color: #000;
  border-radius: 3px;
`

export const TextCreateAnnounce = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`