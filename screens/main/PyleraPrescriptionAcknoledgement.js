import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, ROUTES, SCREEN_CONTENT } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PyleraPrescriptionAcknoledgement = ({ navigation }) => {
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
            <Text style={styles.text}>{SCREEN_CONTENT[language].pylera.content.prescriptionAcknoledgement.content.textBlock}</Text>
            <View>
                <TouchableOpacity style={[styles.button, styles.green]} onPress={() => navigation.navigate(ROUTES.PYLERA_MEDICAMENT_ACKNOLEDGEMENT)}><Text style={styles.buttonText}>{SCREEN_CONTENT[language].pylera.content.prescriptionAcknoledgement.content.button1}</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.red]} onPress={() => navigation.navigate(ROUTES.HOUSE)}><Text style={styles.buttonText}>{SCREEN_CONTENT[language].pylera.content.prescriptionAcknoledgement.content.button2}</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default PyleraPrescriptionAcknoledgement;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 28,
        color: COLORS.TEXTCOLOR,
        fontWeight: 'bold',
    },
    button: {
        alignItems: 'center',
        width: 400,
        padding: 20,
        marginTop: 30,
        borderRadius: 10,
        elevation: 12,
    },
    green: {
        backgroundColor: COLORS.GREEN,
    },
    red: {
        backgroundColor: COLORS.RED,
    },
    buttonText: {
        fontSize: 18,
        color: COLORS.WHITE,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
});