import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { COLORS, ROUTES, SCREEN_CONTENT } from '../../constants';
import IMAGES from '../../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

function Pylera({ navigation }) {
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
    <ScrollView style={styles.scrollContainer}>

    <View style={styles.container}>
      <Image source={IMAGES.logo} style={styles.logo} />

      <TouchableOpacity
        style={[
          styles.button,
        ]}
        onPress={() => navigation.navigate(ROUTES.PYLERA_INDICATION_AND_USAGE)}
      >
        <Text
          style={[
            styles.buttonText,
          ]}
        >
          {SCREEN_CONTENT[language].pylera.content.indicationAndUsage.name}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.button,
        ]}
        onPress={() => navigation.navigate(ROUTES.PYLERA_DOSE_EDUCATION)}
      >
        <Text
          style={[
            styles.buttonText,
          ]}
        >
          {SCREEN_CONTENT[language].pylera.content.doseEducation.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
        ]}
        onPress={() => navigation.navigate(ROUTES.PYLERA_ADVERSE_EVENTS)}
      >
        <Text
          style={[
            styles.buttonText,
          ]}
        >
          {SCREEN_CONTENT[language].pylera.content.adverseEvents.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
        ]}
        onPress={() => navigation.navigate(ROUTES.PYLERA_PATIENT_COUNSELING_INFORMATION)}
      >
        <Text
          style={[
            styles.buttonText,
          ]}
        >
          {SCREEN_CONTENT[language].pylera.content.patientCounselingInformation.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
        ]}
        onPress={() => navigation.navigate(ROUTES.PYLERA_IMPORTANT_ADDITIONAL_INFORMATION_NAVIGATOR)}
      >
        <Text
          style={[
            styles.buttonText,
          ]}
        >
          {SCREEN_CONTENT[language].pylera.content.importantAdditionalInformation.name}
        </Text>
      </TouchableOpacity>

    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: COLORS.WHITE,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 40,
  },
  logo: {
    width: '100%',
    height: 'auto',
    aspectRatio: 3, // Adjust the aspect ratio to fit your logo's dimensions
    resizeMode: 'contain',
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.ACCENT,
    borderRadius: 14,
    paddingVertical: 20,
    marginHorizontal: 8,
    width: 280,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.ACCENT,
    elevation: 18,
  },
  selectedButton: {
    borderColor: COLORS.BLACK,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXTACCENT,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  selectedButtonText: {
  },
});

export default Pylera;