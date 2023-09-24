import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SCREEN_CONTENT } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const MealTimeUpdater = () => {
  const [mealTimes, setMealTimes] = useState({
    breakfast: new Date(),
    lunch: new Date(),
    dinner: new Date(),
    bedtime: new Date(),
  });

  const [schedule, setSchedule] = useState([]);

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('breakfast');
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


    const retrieveMealTimes = async () => {
      try {
        const storedMealTimes = await AsyncStorage.getItem('mealTimes');
        if (storedMealTimes !== null) {
          setMealTimes(JSON.parse(storedMealTimes));
        } else {
          await AsyncStorage.setItem('mealTimes', JSON.stringify(mealTimes));
        }
        console.log('Meal Times retrieved successfully!', storedMealTimes);
      } catch (error) {
        console.log('Error retrieving date and time:', error);
      }
    };

    const retrieveSchedule = async () => {
      try {
        const storedSchedule = await AsyncStorage.getItem('schedule');
        if (storedSchedule !== null) {
          setSchedule(JSON.parse(storedSchedule));
        }
        console.log('Schedule retrieved successfully:', storedSchedule);
      } catch (error) {
        console.log('Error retrieving schedule:', error);
      }
    }

    retrieveSchedule();
    retrieveMealTimes();
    retrieveLanguage();

  }, []);

  const storeMealTimes = async (mealTimes) => {
    try {
      await AsyncStorage.setItem('mealTimes', JSON.stringify(mealTimes));
      console.log('Meal Times stored successfully!', mealTimes);
    } catch (err) {
      console.log('Error storing Meal Times:', err);
    }
  };

  const storeSchedule = async (schedule) => {
    try {
      await AsyncStorage.setItem('schedule', JSON.stringify(schedule));
      console.log('Schedule stored successfully!', schedule);
    } catch (err) {
      console.log('Error storing Scheudle:', err);
    }
  };

  const updateMealTime = (meal) => {
    setMode(meal)
    setShow(true)
  };

  const dateTimeChangeHandler = (event, selectedTime, meal) => {
    setShow(false);
    mealTimes[meal] = selectedTime;
    setMealTimes({ ...mealTimes });




    storeMealTimes(mealTimes);

    console.log('im here');

  };

  return (
    <View style={styles.container}>
      {/* {Object.entries(mealTimes).map(([meal, time]) => ( */}
      <View key={'Breakfast'} style={styles.gridItem}>
        <Text style={styles.title}>{SCREEN_CONTENT[language].treatment.content.mealTimes.breakfast}</Text>
        <Text style={styles.time}>{new Date(mealTimes.breakfast).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</Text>
        <TouchableOpacity style={styles.button} onPress={() => updateMealTime('breakfast')}><Text style={styles.buttonText}>Update</Text></TouchableOpacity>
      </View>

      <View key={'Lunch'} style={styles.gridItem}>
        <Text style={styles.title}>{SCREEN_CONTENT[language].treatment.content.mealTimes.lunch}</Text>
        <Text style={styles.time}>{new Date(mealTimes.lunch).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</Text>
        <TouchableOpacity style={styles.button} onPress={() => updateMealTime('lunch')}><Text style={styles.buttonText}>Update</Text></TouchableOpacity>
      </View>
      <View key={'Dinner'} style={styles.gridItem}>
        <Text style={styles.title}>{SCREEN_CONTENT[language].treatment.content.mealTimes.dinner}</Text>
        <Text style={styles.time}>{new Date(mealTimes.dinner).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</Text>
        <TouchableOpacity style={styles.button} onPress={() => updateMealTime('dinner')}><Text style={styles.buttonText}>Update</Text></TouchableOpacity>
      </View>
      <View key={'Bedtime'} style={styles.gridItem}>
        <Text style={styles.title}>{SCREEN_CONTENT[language].treatment.content.mealTimes.bedtime}</Text>
        <Text style={styles.time}>{new Date(mealTimes.bedtime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</Text>
        <TouchableOpacity style={styles.button} onPress={() => updateMealTime('bedtime')}><Text style={styles.buttonText}>Update</Text></TouchableOpacity>
      </View>

      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode={'time'}
          is24Hour={false}
          onChange={(event, selectedTime) => dateTimeChangeHandler(event, selectedTime, mode)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  gridItem: {
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: COLORS.ACCENT,
    padding: 5,
    borderRadius: 5,
    width: 80,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default MealTimeUpdater;
