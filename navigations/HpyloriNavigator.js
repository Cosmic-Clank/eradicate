import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react'
import { ROUTES, SCREEN_CONTENT } from '../constants';
import { HPYLORI, HPYLORI_CAUSES, HPYLORI_SYMPTOMS, HPYLORI_PEPTIC_ULCER, HPYLORI_DOS_DONTS, HPYLORI_FACTS } from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

function HpyloriNavigator() {
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
        <Stack.Navigator initialRouteName={ROUTES.HPYLORI} screenOptions={{
            // headerShown: false,
            headerLeft: null,
            headerTitleAlign: 'center',


        }}>
            <Stack.Screen name={ROUTES.HPYLORI} component={HPYLORI} options={{
                headerShown: false,
            }} />
            <Stack.Screen name={ROUTES.HPYLORI_CAUSES} component={HPYLORI_CAUSES} options={{
                title: SCREEN_CONTENT[language].hpylori.content.causes.title,
            }} />
            <Stack.Screen name={ROUTES.HPYLORI_SYMPTOMS} component={HPYLORI_SYMPTOMS} options={{
                title: SCREEN_CONTENT[language].hpylori.content.symptoms.title,
            }} />
            <Stack.Screen name={ROUTES.HPYLORI_PEPTIC_ULCER} component={HPYLORI_PEPTIC_ULCER} options={{
                title: SCREEN_CONTENT[language].hpylori.content.pepticUlcerDisease.title,
                headerTitleStyle: {
                    fontSize: 16,
                },
            }} />
            <Stack.Screen name={ROUTES.HPYLORI_DOS_DONTS} component={HPYLORI_DOS_DONTS} options={{
                title: SCREEN_CONTENT[language].hpylori.content.dosAndDonts.title,
            }} />
            <Stack.Screen name={ROUTES.HPYLORI_FACTS} component={HPYLORI_FACTS} options={{
                title: SCREEN_CONTENT[language].hpylori.content.facts.title,
            }} />
        </Stack.Navigator>
    );
}

export default HpyloriNavigator;