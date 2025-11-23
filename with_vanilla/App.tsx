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
import {FormRetirementLetterScreen} from '@/src/screens/FormRetirementLetterScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HeaderRightButton = () => <HamburgerButton />;

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#F5FCF4',
      },
      tabBarStyle: {
        backgroundColor: '#F5FCF4',
      },
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: '#8E8E8F',
    }}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Home',
        headerRight: HeaderRightButton,
        tabBarLabel: 'ホーム',
      }}
    />
    <Tab.Screen
      name="FormRetirementLetter"
      component={FormRetirementLetterScreen}
      options={{
        title: 'Retirement Letter',
        headerRight: HeaderRightButton,
        tabBarLabel: '退職願届',
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
