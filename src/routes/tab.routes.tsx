import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import { LoginPage } from '../screens/LoginPage';
import { ScreenB } from '../screens/ScreenB';

const { Screen, Navigator } = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <>
      <Navigator
        screenOptions={{
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'green',
          headerShown: false
        }}
      > 
        <Screen
          name="screenA"
          options={{
            tabBarLabel: 'Tela A',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons 
                name='home'
                color={color}
                size={size}
              />
            )
          }}
          component={LoginPage}
        />

        <Screen
          name="screenB"
          options={{
            tabBarLabel: 'Novo',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons 
                name='add'
                color={color}
                size={size}
              />
            )
          }}
          component={ScreenB}
        />
      </Navigator>
    </>
  )
}