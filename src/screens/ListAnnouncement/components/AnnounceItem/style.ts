import styled from 'styled-components/native'

export const  Container = styled.View`
  background-color: #fff;
  color: #000;
  width: 350px;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  margin: 10px 0;
`
export const InfoContainer = styled.View`
  margin-left: 10px;
`;

export const Title = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: '#00092C';
`

export const DateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
`

export const Separator = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-left: 5px;
  margin-right: 5px;
`

export const PriceTable = styled.View`
  flex-direction: row;
`

export const FromPrice = styled.Text`
  text-decoration: line-through;
  color: #707070;
  font-size: 14px;
  font-weight: 500;
`

export const ToPrice = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #32CD32;
  margin-left: 10px;
`