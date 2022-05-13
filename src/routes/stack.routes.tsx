import { createNativeStackNavigator} from '@react-navigation/native-stack'
import { LoginPage } from '../screens/LoginPage';
import { ListAnnouncement } from '../screens/ListAnnouncement';

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
          component={ListAnnouncement}
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
          component={LoginPage}
        />
      </Navigator>
    </>
  )
}