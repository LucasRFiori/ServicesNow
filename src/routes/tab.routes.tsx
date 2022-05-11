import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'
import { ScreenA } from '../screens/ScreenA';
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
          component={ScreenA}
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