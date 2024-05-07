import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import RetirementDayScreen from './src/screens/RetirementDayScreen';
import HamburgerButton from './src/components/HamburgerButton';
import FontStylesScreen from './src/screens/FontStylesScreen';
import dayjs from 'dayjs';

dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const Stack = createNativeStackNavigator();

const App: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="RetirementDay"> */}
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
  );
};

export default App;
