import { useState, useEffect, useRef } from 'react';
import { Text, View, Platform, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { COLORS, SCREEN_CONTENT } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import CircleTimer from '../../components/CircleTimer';
import Table from '../../components/Table';
import MealTimeUpdater from '../../components/MealTimeUpdater';
import { useIsFocused } from '@react-navigation/native';

let lang;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default function Treatment({ navigation }) {

  const [dateTime, setDateTime] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [language, setLanguage] = useState('en');

  const [schedule, setSchedule] = useState([
    { time: { hour: 9, minute: 0 }, pyleraCapsules: 3, omeprazoleCapsules: 1 },
    { time: { hour: 12, minute: 0 }, pyleraCapsules: 3, omeprazoleCapsules: 0 },
    { time: { hour: 18, minute: 0 }, pyleraCapsules: 3, omeprazoleCapsules: 1 },
    { time: { hour: 22, minute: 0 }, pyleraCapsules: 3, omeprazoleCapsules: 0 },
  ]);

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {

    const retrieveLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage !== null) {
          console.log('Language retrieved successfully:', storedLanguage);
          setLanguage(storedLanguage);
          lang = storedLanguage;
        }
      } catch (error) {
        console.log('Error retrieving language:', error);
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
    };

    const retrieveDateTime = async () => {
      try {
        const storedDateTime = await AsyncStorage.getItem('dateTime');
        if (storedDateTime !== null) {
          setDateTime(new Date(storedDateTime));
          console.log('Date and time retrieved successfully!');
        } else {
          await storeDateTime(new Date());
          setDateTime(new Date())
        }
      } catch (error) {
        console.log('Error retrieving date and time:', error);
      }
    };

    retrieveSchedule();
    retrieveLanguage();

    registerForPushNotificationsAsync();
    retrieveDateTime();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(async response => {
      const notificationData = response.notification.request.content.data.data;

      const retrieveTodaysPillIntake = async () => {
        try {
          const storedTodaysPillIntake = await AsyncStorage.getItem('todaysPillIntake');
          console.log('Todays Pill Intake retrieved successfully!', storedTodaysPillIntake);
          if (storedTodaysPillIntake !== null) {
            pillIntake = JSON.parse(storedTodaysPillIntake);
            today = new Date();
            if (new Date(pillIntake.date).getDate() === today.getDate() && new Date(pillIntake.date).getMonth() === today.getMonth() && new Date(pillIntake.date).getFullYear() === today.getFullYear()) {
              return pillIntake;
            } else {
              return { date: today, breakfast: false, lunch: false, dinner: false, bedtime: false };
            }
          } else {
            console.log('New day, new pill intake!');
            return {
              breakfast: false,
              lunch: false,
              dinner: false,
              bedtime: false,
              date: new Date()
            }
          }
        } catch (error) {
          console.log('Error retrieving Todays Pill Intake:', error);
          return null;
        }
      };

      const storeTodaysPillIntake = async (todaysPillIntake) => {
        try {
          await AsyncStorage.setItem('todaysPillIntake', JSON.stringify(todaysPillIntake));
          console.log('Todays Pill Intake stored successfully!', JSON.stringify(todaysPillIntake));
        } catch (error) {
          console.log('Error storing Todays Pill Intake:', error);
        }
      };

      const todaysPillIntake = await retrieveTodaysPillIntake();

      if (new Date(todaysPillIntake.date).getDate() !== new Date().getDate()) {
        console.log('New day, new pill intake!');
        todaysPillIntake.date = new Date();
        todaysPillIntake.breakfast = false;
        todaysPillIntake.lunch = false;
        todaysPillIntake.dinner = false;
        todaysPillIntake.bedtime = false;
      }

      if (notificationData.hour === schedule[0].time.hour && notificationData.minute === schedule[0].time.minute) {
        todaysPillIntake.breakfast = true;
      } else if (notificationData.hour === schedule[1].time.hour && notificationData.minute === schedule[1].time.minute) {
        todaysPillIntake.lunch = true;
      } else if (notificationData.hour === schedule[2].time.hour && notificationData.minute === schedule[2].time.minute) {
        todaysPillIntake.dinner = true;
      } else if (notificationData.hour === schedule[3].time.hour && notificationData.minute === schedule[3].time.minute) {
        todaysPillIntake.bedtime = true;
      }

      storeTodaysPillIntake(todaysPillIntake);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  

  const storeDateTime = async (dateTime) => {
    try {
      await AsyncStorage.setItem('dateTime', dateTime.toISOString());
      console.log('Date and time stored successfully!');
    } catch (error) {
      console.log('Error storing date and time:', error);
    }
  };

  const dateTimeChangeHandler = (event, selectedDate) => {
    setShow(false)
    setDateTime(selectedDate);
    storeDateTime(selectedDate);
  };

  const showDatePicker = () => {
    setShow(true);
    setMode('date');
  }

  const showTimePicker = () => {
    setShow(true);
    setMode('time');
  }

  const retrieveMealTimes = async () => {
    try {
      const storedMealTimes = await AsyncStorage.getItem('mealTimes');
      if (storedMealTimes !== null) {
        return JSON.parse(storedMealTimes);
      }
      console.log('Meal Times retrieved successfully!', storedMealTimes);
    } catch (error) {
      console.log('Error retrieving date and time:', error);
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


  async function schedulePushNotification() {

    await Notifications.cancelAllScheduledNotificationsAsync();
    const mealTimes = await retrieveMealTimes();

    const sch = [
      { time: { hour: new Date(mealTimes['breakfast']).getHours(), minute: new Date(mealTimes['breakfast']).getMinutes() }, pyleraCapsules: 3, omeprazoleCapsules: 1 },
      { time: { hour: new Date(mealTimes['lunch']).getHours(), minute: new Date(mealTimes['lunch']).getMinutes() }, pyleraCapsules: 3, omeprazoleCapsules: 0 },
      { time: { hour: new Date(mealTimes['dinner']).getHours(), minute: new Date(mealTimes['dinner']).getMinutes() }, pyleraCapsules: 3, omeprazoleCapsules: 1 },
      { time: { hour: new Date(mealTimes['bedtime']).getHours(), minute: new Date(mealTimes['bedtime']).getMinutes() }, pyleraCapsules: 3, omeprazoleCapsules: 0 },
    ]

    setSchedule(sch)

    await storeSchedule(sch)


    Alert.alert(
      SCREEN_CONTENT[lang].treatment.content.alert.title,
      SCREEN_CONTENT[lang].treatment.content.alert.content,
      [{ text: SCREEN_CONTENT[lang].treatment.content.alert.button }]
    );

    for (let i = 0; i < schedule.length; i++) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Its time for your dose!',
          body: `Take ${schedule[i].pyleraCapsules} capsules of PYLERA and ${schedule[i].omeprazoleCapsules} capsules of OMEPRAZOLE now!`,
          subtitle: 'Click to confirm dose taken or swipe to dismiss.',
          data: { data: { hour: schedule[i].time.hour, minute: schedule[i].time.minute } },
          sound: true,
        },
        trigger: {
          hour: schedule[i].time.hour,
          minute: schedule[i].time.minute,
          repeats: true,
        },
      });
    }
    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'Its time for your dose!',
    //     body: `Take ${schedule[0].pyleraCapsules} capsules of PYLERA and ${schedule[0].omeprazoleCapsules} capsules of OMEPRAZOLE now!`,
    //     subtitle: 'Click to confirm dose taken or swipe to dismiss.',
    //     color: '#FF0000',
    //     data: { data: { hour: schedule[0].time.hour, minute: schedule[0].time.minute } },
    //   },
    //   trigger: {
    //     seconds: 1,
    //     // repeats: true, 
    //   },
    // });
  }

  async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MIN,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }

    } else {
      alert('Must use physical device for Push Notifications');
    }
  }


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>{SCREEN_CONTENT[language].treatment.content.textBlock1}</Text>
      <Text style={styles.label}>{SCREEN_CONTENT[language].treatment.content.textBlock2} {dateTime.toLocaleDateString(language, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}</Text>

      <TouchableOpacity style={styles.button} onPress={showDatePicker}>
        <Text style={styles.buttonText}>{SCREEN_CONTENT[language].treatment.content.buttonBlock1}</Text>
      </TouchableOpacity>


      <Text style={styles.label}>{SCREEN_CONTENT[language].treatment.content.textBlock3} {dateTime.toLocaleTimeString(language, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })}</Text>

      <TouchableOpacity style={styles.button} onPress={showTimePicker}>
        <Text style={styles.buttonText}>{SCREEN_CONTENT[language].treatment.content.buttonBlock2}</Text>
      </TouchableOpacity>

      {show && (
        <RNDateTimePicker
          testID="dateTimePicker"
          value={dateTime}
          mode={mode}
          is24Hour={false}
          onChange={dateTimeChangeHandler}
        />
      )}

      <MealTimeUpdater />

      <TouchableOpacity style={styles.startButton} onPress={schedulePushNotification}>
        <Text style={styles.buttonText}>{SCREEN_CONTENT[language].treatment.content.buttonBlock3}</Text>
      </TouchableOpacity>

      <Text style={styles.text}>{SCREEN_CONTENT[language].treatment.content.textBlock5}</Text>
      <Text style={styles.label}>{SCREEN_CONTENT[language].treatment.content.textBlock6}</Text>

      <Table
        tableHead={SCREEN_CONTENT[language].treatment.content.tableState.tableHead}
        tableData={[
          [SCREEN_CONTENT[language].treatment.content.tableState.tableData[0][0], SCREEN_CONTENT[language].treatment.content.tableState.tableData[0][1], SCREEN_CONTENT[language].treatment.content.tableState.tableData[0][2]],
          [SCREEN_CONTENT[language].treatment.content.tableState.tableData[1][0], SCREEN_CONTENT[language].treatment.content.tableState.tableData[1][1], SCREEN_CONTENT[language].treatment.content.tableState.tableData[1][2]],
          [SCREEN_CONTENT[language].treatment.content.tableState.tableData[2][0], SCREEN_CONTENT[language].treatment.content.tableState.tableData[2][1], SCREEN_CONTENT[language].treatment.content.tableState.tableData[2][2]],
          [SCREEN_CONTENT[language].treatment.content.tableState.tableData[3][0], SCREEN_CONTENT[language].treatment.content.tableState.tableData[3][1], SCREEN_CONTENT[language].treatment.content.tableState.tableData[3][2]],
        ]} />
      <Text>{'\n\n\n\n\n\n'}</Text>

    </ScrollView>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.WHITE,
    // justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    margin: 10,
  },
  head: {
    height: 60,
    backgroundColor: COLORS.ACCENT_LIGHT,
  },
  text: {
    fontSize: 16,

    marginBottom: 10,

  },
  button: {
    backgroundColor: COLORS.ACCENT,
    padding: 10,
    borderRadius: 10,
    marginBottom: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    backgroundColor: COLORS.GREEN,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
  countDownTimer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 26,
  },
  countDownTimerText: {
    fontSize: 20,
    marginBottom: 20,
    // fontWeight: 'bold',
  },

});