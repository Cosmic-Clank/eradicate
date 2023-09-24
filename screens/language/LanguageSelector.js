import React from 'react'
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, IMAGES, ROUTES } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeLanguage = async (language) => {
  try {
    await AsyncStorage.setItem('language', language);
    console.log('Language saved:', language);
  } catch (e) {
    console.log('Error Saving Language:', e);
  }
};

function LanguageSelector({ navigation }) {
  function LanguageItem({ imageSource, title, langauge }) {
    return (
      <TouchableOpacity style={styles.languageItem} onPress={() => {
        storeLanguage(langauge);
        navigation.navigate(ROUTES.HOME)
      }}>
        {/* <Image source={imageSource} style={styles.image} /> */}
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    );
  }

  const data = [
    {
      title: "English",
      // imageSource: IMAGES.english,
      language: "en",
    },
    {
      title: "عربي",
      // imageSource: IMAGES.arabic,
      language: "ar",
    },
    // {
    //   title: "اردو",
    //   // imageSource: IMAGES.urdu,
    //   language: "ur",
    // },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.languageSelectorImageContainer}>
        <Image source={IMAGES.language_selctor} style={styles.languageSelectorImage} />
        <Image source={IMAGES.logo} style={styles.logo} />
      </View>
      <View style={styles.languageSelectorItemContainer}>
      <Text style={styles.heading}>Select Prefered Language</Text>
      {data.map((item, index) => (
        <LanguageItem key={index} imageSource={item.imageSource} title={item.title} langauge={item.language} />
      ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    height: '100%',
  },
  languageSelectorImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageSelectorImage: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1.5 / 1,
    resizeMode: 'cover',
  },
  logo: {
    width: '60%',
    position: 'absolute',
    bottom: -80,
    height: 140,
    backgroundColor: COLORS.WHITE,
    aspectRatio: 1 / 1,
    resizeMode: 'cover',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  languageSelectorItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 140,
  },
  languageItem: {
    backgroundColor: COLORS.ACCENT,
    width: '80%',
    // borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
    elevation: 18,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 20,
  },
});

export default LanguageSelector;