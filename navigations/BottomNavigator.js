import { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, ROUTES, SCREEN_CONTENT } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DASHBOARD, HOUSE, DASH } from '../screens';
import HPYLORI_NAVIGATOR from './HpyloriNavigator';
import TREATMENT_NAVIGATOR from './TreatmentNavigator';
import PYLERA_NAVIGATOR from './PyleraNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();

function BottomNavigator() {

  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const retrieveLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage !== null) {
          console.log('Language retrieved successfully:', storedLanguage);
          setLanguage(storedLanguage);
        }
      } catch (error) {
        console.log('Error retrieving language:', error);
      }
    };

    retrieveLanguage();
  }, []);

  return (
    <Tab.Navigator backBehavior='initialRoute' screenOptions={({ route }) => ({
      headerStyle: {
        backgroundColor: COLORS.PRIMARY,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
        letterSpacing: 1.5,
      },
      headerTitleAlign: 'center',
      headerTintColor: COLORS.WHITE,
      tabBarActiveTintColor: COLORS.WHITE,
      tabBarInactiveTintColor: COLORS.OFFWHITE,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: COLORS.PRIMARY,
        height: 70,
      },
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === ROUTES.HPYLORI_NAVIGATOR) {
          iconName = focused ? 'bacteria' : 'bacteria-outline';
        } else if (route.name === ROUTES.PYLERA_NAVIGATOR) {
          iconName = focused ? 'pill' : 'pill';
        } else if (route.name === ROUTES.TREATMENT_NAVIGATOR) {
          iconName = focused ? 'timer' : 'timer-outline';
        } else if (route.name === ROUTES.HOUSE) {
          iconName = focused ? 'home-variant' : 'home-variant-outline'
        } else if (route.name === ROUTES.DASHBOARD) {
          iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
        }
        return <Icon name={iconName} size={35} color={color} />;
      }
    })}>

      <Tab.Screen name={ROUTES.HOUSE} component={HOUSE} options={{
        headerTitle: SCREEN_CONTENT[language].home.title,
      }} />
      <Tab.Screen name={ROUTES.HPYLORI_NAVIGATOR} component={HPYLORI_NAVIGATOR} options={{
        headerTitle: SCREEN_CONTENT[language].hpylori.title,
      }} />
      <Tab.Screen name={ROUTES.PYLERA_NAVIGATOR} component={PYLERA_NAVIGATOR} options={{
        headerTitle: SCREEN_CONTENT[language].pylera.title,
      }} />
      <Tab.Screen name={ROUTES.TREATMENT_NAVIGATOR} component={TREATMENT_NAVIGATOR} options={{
        headerTitle: SCREEN_CONTENT[language].treatment.title,
      }} />
      <Tab.Screen name={ROUTES.DASHBOARD} component={DASHBOARD} options={{
        headerTitle: SCREEN_CONTENT[language].dashboard.title,
      }} />
    </Tab.Navigator>
  );
}

export default BottomNavigator;