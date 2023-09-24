import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react'
import { ROUTES, SCREEN_CONTENT } from '../constants';
import { PYLERA_IAI_WARNING_AND_PRECAUTIONS, PYLERA_IAI_DRUG_INTERACTIONS, PYLERA_IAI_CONTRAINDICATIONS, PYLERA_IMPORTANT_ADDITIONAL_INFORMATION } from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

function PyleraImportantAdditionalInformationNavigator() {

    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const retrieveLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem('language');
                if (storedLanguage !== null) {
                    console.log('Language retrieved successfully:', storedLanguage);
                    setLanguage(storedLanguage);
                }
            } catch (err) {
                console.log('Error retrieving language:', err);
            }
        };

        retrieveLanguage();
    }, []);

    return (
        <Stack.Navigator initialRouteName={ROUTES.PYLERA_IMPORTANT_ADDITIONAL_INFORMATION} screenOptions={{
            // headerShown: false,
            headerLeft: null,
            headerTitleAlign: 'center',
        }}>
            <Stack.Screen name={ROUTES.PYLERA_IMPORTANT_ADDITIONAL_INFORMATION} component={PYLERA_IMPORTANT_ADDITIONAL_INFORMATION} options={{
                title: SCREEN_CONTENT[language].pylera.content.importantAdditionalInformation.title,
            }} />
            <Stack.Screen name={ROUTES.PYLERA_IAI_WARNING_AND_PRECAUTIONS} component={PYLERA_IAI_WARNING_AND_PRECAUTIONS} options={{
                title: SCREEN_CONTENT[language].pylera.content.importantAdditionalInformation.content.warningAndPrecautions.title,
            }} />
            <Stack.Screen name={ROUTES.PYLERA_IAI_DRUG_INTERACTIONS} component={PYLERA_IAI_DRUG_INTERACTIONS} options={{
                title: SCREEN_CONTENT[language].pylera.content.importantAdditionalInformation.content.drugInteractions.title,
            }} />
            <Stack.Screen name={ROUTES.PYLERA_IAI_CONTRAINDICATIONS} component={PYLERA_IAI_CONTRAINDICATIONS} options={{
                title: SCREEN_CONTENT[language].pylera.content.importantAdditionalInformation.content.contraindications.title,
            }} />
        </Stack.Navigator>
    );
}

export default PyleraImportantAdditionalInformationNavigator;