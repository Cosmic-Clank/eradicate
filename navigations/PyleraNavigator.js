import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react'
import { ROUTES, SCREEN_CONTENT } from '../constants';
import { PYLERA, PYLERA_PATIENT_COUNSELING_INFORMATION, PYLERA_DOSE_EDUCATION, PYLERA_FAQ, PYLERA_PRESCRIPTION_ACKNOLEDGEMENT, PYLERA_MEDICAMENT_ACKNOLEDGEMENT, PYLERA_INDICATION_AND_USAGE, PYLERA_ADVERSE_EVENTS } from '../screens';
import PYLERA_IMPORTANT_ADDITIONAL_INFORMATION_NAVIGATOR from './PyleraImportantAdditionalInformationNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

function PyleraNavigator() {

  const [language, setLanguage] = useState('en');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataRetrieved, setDataRetrieved] = useState(false);

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

    const checkTermsAcceptance = async () => {
      try {
        const accepted = await AsyncStorage.getItem('acceptedTerms');
        console.log('Terms accepted:', accepted);
        if (accepted === 'true') {
          setTermsAccepted(true);
        } else {
          setTermsAccepted(false);
        }
      } catch (err) {
        console.log('Error retrieving terms acceptance:', err);
      } finally {
        setDataRetrieved(true);
      }
    }

    checkTermsAcceptance();
    retrieveLanguage();
  }, []);

  if (!dataRetrieved) {
    return null;
  }

  return (

    <Stack.Navigator initialRouteName={termsAccepted ? ROUTES.PYLERA : ROUTES.PYLERA_PRESCRIPTION_ACKNOLEDGEMENT} screenOptions={{
      // headerShown: false,
      headerLeft: null,
      headerTitleAlign: 'center',
    }}>
      <Stack.Screen name={ROUTES.PYLERA} component={PYLERA} options={{
        headerShown: false,
      }} />
      <Stack.Screen name={ROUTES.PYLERA_PRESCRIPTION_ACKNOLEDGEMENT} component={PYLERA_PRESCRIPTION_ACKNOLEDGEMENT} options={{
        headerShown: false,
      }} />
      <Stack.Screen name={ROUTES.PYLERA_MEDICAMENT_ACKNOLEDGEMENT} component={PYLERA_MEDICAMENT_ACKNOLEDGEMENT} options={{
        headerShown: false,
      }} />
      <Stack.Screen name={ROUTES.PYLERA_PATIENT_COUNSELING_INFORMATION} component={PYLERA_PATIENT_COUNSELING_INFORMATION} options={{
        title: SCREEN_CONTENT[language].pylera.content.patientCounselingInformation.title,
      }} />
      <Stack.Screen name={ROUTES.PYLERA_INDICATION_AND_USAGE} component={PYLERA_INDICATION_AND_USAGE} options={{
        title: SCREEN_CONTENT[language].pylera.content.indicationAndUsage.title,
      }} />
      <Stack.Screen name={ROUTES.PYLERA_ADVERSE_EVENTS} component={PYLERA_ADVERSE_EVENTS} options={{
        title: SCREEN_CONTENT[language].pylera.content.adverseEvents.title,
      }} />
      <Stack.Screen name={ROUTES.PYLERA_DOSE_EDUCATION} component={PYLERA_DOSE_EDUCATION} options={{
        title: SCREEN_CONTENT[language].pylera.content.doseEducation.title,
      }} />
      <Stack.Screen name={ROUTES.PYLERA_IMPORTANT_ADDITIONAL_INFORMATION_NAVIGATOR} component={PYLERA_IMPORTANT_ADDITIONAL_INFORMATION_NAVIGATOR} options={{
        title: SCREEN_CONTENT[language].pylera.content.importantAdditionalInformation.title,
        headerShown: false,
      }} />
    </Stack.Navigator>
  );
}

export default PyleraNavigator;