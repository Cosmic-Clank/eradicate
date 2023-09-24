import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS, IMAGES, SCREEN_CONTENT, ROUTES } from '../../constants';
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const HpyloriCauses = ({ navigation }) => {
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
      <Image source={IMAGES.hpylori} style={styles.image} />
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.bulletTextTitle}>
          {SCREEN_CONTENT[language].hpylori.content.causes.content.textBlock1}
        </Text>
        <Text style={styles.bulletTextContent}>
          {SCREEN_CONTENT[language].hpylori.content.causes.content.textBlock2}
        </Text>

      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.invisible}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(ROUTES.HPYLORI)}>
          <Text style={styles.buttonText}><Icon name='backup-restore' size={35} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate(ROUTES.HPYLORI_SYMPTOMS)}>
          <Text style={styles.buttonText}><Icon name='chevron-right' size={35} /></Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HpyloriCauses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    top: '20%',
    width: '100%',
    height: '80%',
    paddingHorizontal: 26,
    paddingTop: 26,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,

  },
  bulletTextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bulletTextContent: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 26,
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
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontWeight: 'bold',
  },
  previousButton: {
    backgroundColor: COLORS.ACCENT,
    borderRadius: 100,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: COLORS.ACCENT,
    borderRadius: 100,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invisible: {
    width: 80,
    height: 80,
  },
});