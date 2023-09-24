import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { SCREEN_CONTENT } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CircleTimer = () => {

    const [schedule, setSchedule] = useState([]);
    const [language, setLanguage] = useState('en');
    const [duration, setDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const retrieveSchedule = async () => {
            try {
                const storedSchedule = await AsyncStorage.getItem('schedule');
                if (storedSchedule !== null) {
                    setSchedule(JSON.parse(storedSchedule));
                }
                console.log('Schedule retrieved successfully:', storedSchedule);
            } catch (error) {
                console.log('Error retrieving schedule:', error);
            } finally {
                setIsLoading(false);
            }
        }

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

        retrieveSchedule();
        retrieveLanguage();
    }, [useIsFocused()]);


    function calculateNextScheduleTime(schedule) {

        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();

        let nextScheduledTime = null;

        // Find the next scheduled time greater than the current time
        for (let i = 0; i < schedule.length; i++) {
            const { hour, minute } = schedule[i].time;
            if (hour > currentHour || (hour === currentHour && minute > currentMinute)) {
                nextScheduledTime = schedule[i].time;
                break;
            }
        }

        if (!nextScheduledTime) {
            // If there is no future scheduled time, set the first schedule as the next scheduled time for the next day
            nextScheduledTime = schedule[0].time;
        }

        const nextScheduledDate = new Date();
        nextScheduledDate.setHours(nextScheduledTime.hour, nextScheduledTime.minute, 0, 0);

        const remainingTimeInMillis = nextScheduledDate.getTime() - currentTime.getTime();
        const remainingTimeInSeconds = Math.ceil(remainingTimeInMillis / 1000);

        return remainingTimeInSeconds;
    };

    function calculatePreviousScheduleTime(schedule) {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const currentSecond = currentTime.getSeconds();

        let passedScheduleTime = null;

        // Find the schedule that has just passed based on the current time
        for (let i = 0; i < schedule.length; i++) {
            const { hour, minute } = schedule[i].time;
            if (
                hour < currentHour ||
                (hour === currentHour && minute < currentMinute)
            ) {
                passedScheduleTime = schedule[i].time;
            } else {
                break; // Exit the loop once a future schedule is encountered
            }
        }

        // If no passed schedule found, use the last schedule as the "previous" schedule
        if (!passedScheduleTime) {
            passedScheduleTime = schedule[schedule.length - 1].time;
        }

        // Calculate the time difference in seconds
        const passedTimeInSeconds =
            (passedScheduleTime.hour - currentHour) * 3600 +
            (passedScheduleTime.minute - currentMinute) * 60 -
            currentSecond;

        return passedTimeInSeconds;
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const remainingMinutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(remainingMinutes).padStart(2, "0");
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }



    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <CountdownCircleTimer
                isPlaying={schedule.length === 0 ? false : true}
                isGrowing={true}
                initialRemainingTime={schedule.length === 0 ? 0 : calculateNextScheduleTime(schedule)}
                duration={schedule.length === 0 ? 0 : calculateNextScheduleTime(schedule) + calculatePreviousScheduleTime(schedule)}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[15 * 60 * 60, 3 * 60 * 60, 2 * 60 * 60, 0]}
                onComplete={() => ({ shouldRepeat: true, delay: 0 })}
                updateInterval={1}
            >
                {({ remainingTime, color }) => {



                    return (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: 16 }}>
                                {SCREEN_CONTENT[language].treatment.content.timer.title}
                            </Text>
                            <Text style={{ color, fontSize: 30 }}>
                                {formatTime(remainingTime)}
                            </Text>
                        </View>
                    )
                }}
            </CountdownCircleTimer>
            {schedule.length === 0 && <Text style={{ marginTop: 10, fontSize: 16, textAlign: 'center' }}><Icon name='information-outline' size={18} color='black' /> {SCREEN_CONTENT[language].treatment.content.timer.textBlock}</Text>}
        </View>
    )
}

export default CircleTimer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})