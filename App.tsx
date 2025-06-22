import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import RetirementDayScreen from './src/screens/RetirementDayScreen';
import HamburgerButton from './src/components/HamburgerButton';
import FontStylesScreen from './src/screens/FontStylesScreen';
import React from 'react';
import {ModalProvider} from './src/components/ModalProvider';
import {CalenderProvider} from './src/components/CalenderProvider';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#F5FCF4',
      },
      tabBarStyle: {
        backgroundColor: '#F5FCF4',
      },
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Overview',
        headerRight: () => <HamburgerButton />,
        tabBarLabel: 'ホーム',
      }}
    />
    <Tab.Screen
      name="FontStyles"
      component={FontStylesScreen}
      options={{
        title: 'Font Styles',
        tabBarLabel: 'フォント',
      }}
    />
  </Tab.Navigator>
);

const App: React.FC<{}> = () => {
  return (
    <CalenderProvider>
      <ModalProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RetirementDay"
              component={RetirementDayScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ModalProvider>
    </CalenderProvider>
  );
};

export default App;
