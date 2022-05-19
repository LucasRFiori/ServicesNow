import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { LoginPage } from '../screens/LoginPage';
import { ListAnnouncement } from '../screens/ListAnnouncement';
import { CreateAccount } from '../screens/CreateAccount';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth'

const { Screen, Navigator } = createNativeStackNavigator();
type User = {
  uid: string;
}

export function StackRoutes() {

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {

    const subscriber = auth().onAuthStateChanged(userInfo => {
      setUser(userInfo)
    })

    return subscriber
  }, []) // observar se usuario esta logado
  
  return (
    <>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      > 
        <Screen
          name="LoginPage"
          component={LoginPage}
        />

        {user && (
          <Screen
            name="ListAnnouncement"
            options={{
              title: 'Tela B',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'green'
              },
              headerTintColor: '#fff'
            }}
            component={ListAnnouncement}
          />
        )}
        
          <Screen
            name="CreateAccount"
            options={{
              title: 'Tela B',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'green'
              },
              headerTintColor: '#fff'
            }}
            component={CreateAccount}
          />
        
      </Navigator>
    </>
  )
}