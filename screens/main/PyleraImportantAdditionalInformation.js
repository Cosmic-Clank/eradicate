import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { COLORS, ROUTES, SCREEN_CONTENT } from '../../constants';
import IMAGES from '../../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


function PyleraImportantAdditionalInformation({ navigation }) {
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
    <View style={styles.container}>
      <Image source={IMAGES.logo} style={styles.logo} />

      <TouchableOpacity
        style={[
          styles.button,
        ]}
        onPress={() => navigation.navigate(ROUTES.PYLERA_IAI_WARNING_AND_PRECAUTIONS)}
      >
        <Text
          style={[
            styles.buttonText,
          ]}
        >
          {SCREEN_CONTENT[language].pylera.content.importantAdditionalInformation.content.warningAndPrecautions.name}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.button,
        ]}
        onPress={() => navigation.navigate(ROUTES.PYLERA_IAI_DRUG_INTERACTIONS)}
      >
        <Text
          style={[
            styles.buttonText,
          ]}
        >
          {SCREEN_CONTENT[language].pylera.content.importantAdditionalInformation.content.drugInteractions.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
        ]}
        onPress={() => navigation.navigate(ROUTES.PYLERA_IAI_CONTRAINDICATIONS)}
      >
        <Text
          style={[
            styles.buttonText,
          ]}
        >
          {SCREEN_CONTENT[language].pylera.content.importantAdditionalInformation.content.contraindications.name}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.invisible}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(ROUTES.PYLERA)}>
          <Text style={{...styles.buttonText, color:COLORS.WHITE}}><Icon name='backup-restore' size={35} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.invisible}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 40,
    backgroundColor: COLORS.WHITE,
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
  buttons: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: COLORS.ACCENT,
    borderRadius: 100,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
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
  invisible: {
    width: 80,
    height: 80,
  },
  selectedButtonText: {
  },
});

export default PyleraImportantAdditionalInformation;