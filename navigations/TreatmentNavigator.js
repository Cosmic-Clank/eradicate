import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ROUTES } from '../constants';
import { TREATMENT } from '../screens';

const Stack = createStackNavigator();

function TreatmentNavigator() {
    return (
        <Stack.Navigator initialRouteName={ROUTES.TREATMENT} screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name={ROUTES.TREATMENT} component={TREATMENT} />
        </Stack.Navigator>
    );
}

export default TreatmentNavigator;