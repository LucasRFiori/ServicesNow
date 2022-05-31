import styled from 'styled-components/native'

export const ViewAnnounceContainer = styled.View`
  width: 100%;
  background-color: #fff;
  height: 80%;
  border-radius: 5px;
  padding: 20px;
`

export const Title = styled.Text`
  font-size: 25px;
  color: #000;
  font-weight: 600;
  margin-bottom: 20px;
`

export const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`

export const Separator = styled.Text`
  font-size: 30px;
  font-weight: bold;
  margin-left: 7px;
  margin-right: 7px;
`

export const PriceTable = styled.View`
  flex-direction: row;
  align-items: center;
`

export const FromPrice = styled.Text`
  color: #707070;
  font-size: 18px;
  text-decoration: line-through;
  margin-right: 10px;
`

export const ToPrice = styled.Text`
  font-size: 23px;
  color: #32CD32;
`

export const DescriptionContainer = styled.View`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  width: 100%;
`

export const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`