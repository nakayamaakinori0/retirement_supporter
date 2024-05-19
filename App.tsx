import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import RetirementDayScreen from './src/screens/RetirementDayScreen';
import HamburgerButton from './src/components/HamburgerButton';
import FontStylesScreen from './src/screens/FontStylesScreen';
import React from 'react';
import {ModalProvider} from './src/components/ModalProvider';
import {CalenderProvider} from './src/components/CalenderProvider';

const Stack = createNativeStackNavigator();

const App: React.FC<{}> = () => {
  return (
    <CalenderProvider>
      <ModalProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Overview',
                headerRight: () => <HamburgerButton></HamburgerButton>,
                headerStyle: {
                  backgroundColor: '#F5FCF4',
                },
              }}></Stack.Screen>
            <Stack.Screen
              name="RetirementDay"
              component={RetirementDayScreen}></Stack.Screen>
            <Stack.Screen
              name="FontStyles"
              component={FontStylesScreen}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </ModalProvider>
    </CalenderProvider>
  );
};

export default App;
