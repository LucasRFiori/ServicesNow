import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { LoginPage } from '../screens/LoginPage';
import { ListAnnouncement } from '../screens/ListAnnouncement';
import { CreateAccount } from '../screens/CreateAccount';

const { Screen, Navigator } = createNativeStackNavigator();

export function StackRoutes() {
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