import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { COLORS, ROUTES, SCREEN_CONTENT } from '../../constants';
import IMAGES from '../../constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Hpylori({ navigation }) {
  const [selectedButton, setSelectedButton] = useState('');
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

  const handleButtonPress = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <ScrollView style={styles.scrollContainer}>

      <View style={styles.container}>
        <Image source={IMAGES.logo} style={styles.logo} />

        <TouchableOpacity
          style={[
            styles.button,
          ]}
          onPress={() => navigation.navigate(ROUTES.HPYLORI_CAUSES)}
        >
          <Text
            style={[
              styles.buttonText,
            ]}
          >
            {SCREEN_CONTENT[language].hpylori.content.causes.name}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
          ]}
          onPress={() => navigation.navigate(ROUTES.HPYLORI_SYMPTOMS)}
        >
          <Text
            style={[
              styles.buttonText,
            ]}
          >
            {SCREEN_CONTENT[language].hpylori.content.symptoms.name}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
          ]}
          onPress={() => navigation.navigate(ROUTES.HPYLORI_PEPTIC_ULCER)}
        >
          <Text
            style={[
              styles.buttonText,
            ]}
          >
            {SCREEN_CONTENT[language].hpylori.content.pepticUlcerDisease.name}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
          ]}
          onPress={() => navigation.navigate(ROUTES.HPYLORI_DOS_DONTS)}
        >
          <Text
            style={[
              styles.buttonText,
            ]}
          >
            {SCREEN_CONTENT[language].hpylori.content.dosAndDonts.name}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
          ]}
          onPress={() => navigation.navigate(ROUTES.HPYLORI_FACTS)}
        >
          <Text
            style={[
              styles.buttonText,
            ]}
          >
            {SCREEN_CONTENT[language].hpylori.content.facts.name}
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

export default Hpylori;