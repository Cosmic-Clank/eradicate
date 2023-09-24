import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ROUTES } from '../constants';
import { LanguageSelector, Home } from '../screens';
import BottomNavigator from '../navigations/BottomNavigator'

const Stack = createStackNavigator();

function LanguageNavigator() {
    const showLanguageSelector = true;
    const initialRouteName = showLanguageSelector ? ROUTES.LANGUAGE_SELECTOR : ROUTES.HOUSE;

    return (
        <Stack.Navigator initialRouteName={initialRouteName}>
            <Stack.Screen name={ROUTES.LANGUAGE_SELECTOR} component={LanguageSelector} options={{
                headerShown: false,
            }} />
            <Stack.Screen name={ROUTES.HOME} component={BottomNavigator} options={{
                headerShown: false,
            }} />
        </Stack.Navigator>
    );
}

export default LanguageNavigator;