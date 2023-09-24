import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import CircleTimer from '../../components/CircleTimer'
import Table from '../../components/Table'
import { SCREEN_CONTENT } from '../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Progress from 'react-native-progress';
import { useIsFocused } from '@react-navigation/native'

const Dashboard = () => {

    const [language, setLanguage] = useState('en');
    const [todaysPillIntake, setTodaysPillIntake] = useState({ date: new Date(), breakfast: false, lunch: false, dinner: false, bedtime: false });
    const [dateTime, setDateTime] = useState(new Date());

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

        const retrieveTodaysPillIntake = async () => {
            try {
                const storedTodaysPillIntake = await AsyncStorage.getItem('todaysPillIntake');


                if (storedTodaysPillIntake !== null) {
                    pillIntake = JSON.parse(storedTodaysPillIntake);
                    today = new Date();
                    pillDate = new Date(pillIntake.date);

                    if (pillDate.getDate() === today.getDate() && pillDate.getMonth() === today.getMonth() && pillDate.getFullYear() === today.getFullYear()) {
                        setTodaysPillIntake(pillIntake);
                    } else {
                        setTodaysPillIntake({ date: today, breakfast: false, lunch: false, dinner: false, bedtime: false });
                    }
                }

                console.log('Todays Pill Intake retrieved successfully!', todaysPillIntake);

            } catch (error) {
                console.log('Error retrieving Todays Pill Intake:', error);
                return null;
            }
        };
        

        const retrieveDateTime = async () => {
            try {
                const storedDateTime = await AsyncStorage.getItem('dateTime');
                if (storedDateTime !== null) {
                    setDateTime(new Date(storedDateTime));
                }
                console.log('Date and time retrieved successfully!', dateTime);
            } catch (error) {
                console.log('Error retrieving date and time:', error);
            }
        };

        retrieveLanguage();
        retrieveTodaysPillIntake();
        retrieveDateTime();
    }, [useIsFocused()])

    const differenceInDays = (date1, date2) => {
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
        const timeDifference = Math.abs(date2 - date1); // Calculate the absolute time difference in milliseconds
        const differenceInDays = Math.floor(timeDifference / millisecondsPerDay); // Convert to days
        return differenceInDays;
    }

    return (
        <ScrollView style={styles.container}>
            <CircleTimer />

            <Progress.Bar style={styles.progressBar} progress={differenceInDays(dateTime, new Date()) / 10} width={null} height={10} color='green' />
            <Text style={styles.daysProgressedText}>{SCREEN_CONTENT[language].dashboard.content.daysProgressedText} {differenceInDays(dateTime, new Date())}/10</Text>

            <Text style={styles.text}>{SCREEN_CONTENT[language].dashboard.content.tableContent.title}</Text>
            <Table
                tableHead={SCREEN_CONTENT[language].dashboard.content.tableContent.tableHead}
                tableData={language==='ar'? [
                    [todaysPillIntake.breakfast ? <Icon name='check' size={28} color='black' /> : <Icon name='close' size={28} color='black' />, SCREEN_CONTENT[language].dashboard.content.tableContent.body[0]],
                    [todaysPillIntake.lunch ? <Icon name='check' size={28} color='black' /> : <Icon name='close' size={28} color='black' />, SCREEN_CONTENT[language].dashboard.content.tableContent.body[1]],
                    [todaysPillIntake.dinner ? <Icon name='check' size={28} color='black' /> : <Icon name='close' size={28} color='black' />, SCREEN_CONTENT[language].dashboard.content.tableContent.body[2]],
                    [todaysPillIntake.bedtime ? <Icon name='check' size={28} color='black' /> : <Icon name='close' size={28} color='black' />, SCREEN_CONTENT[language].dashboard.content.tableContent.body[3]],
                ]: [
                    [SCREEN_CONTENT[language].dashboard.content.tableContent.body[0], todaysPillIntake.breakfast ? <Icon name='check' size={28} color='black' /> : <Icon name='close' size={28} color='black' />],
                    [SCREEN_CONTENT[language].dashboard.content.tableContent.body[1], todaysPillIntake.lunch ? <Icon name='check' size={28} color='black' /> : <Icon name='close' size={28} color='black' />],
                    [SCREEN_CONTENT[language].dashboard.content.tableContent.body[2], todaysPillIntake.dinner ? <Icon name='check' size={28} color='black' /> : <Icon name='close' size={28} color='black' />],
                    [SCREEN_CONTENT[language].dashboard.content.tableContent.body[3], todaysPillIntake.bedtime ? <Icon name='check' size={28} color='black' /> : <Icon name='close' size={28} color='black' />],
                ]} />
        </ScrollView>

    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    text: {
        fontSize: 20,
        marginTop: 30,
    },
    progressBar: {
        marginTop: 10,
    },
    daysProgressedText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 5,
    }


})