import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const HomeCard = ({ imageSource, text }) => {
    return (
        <View style={styles.container}>
            <Image source={imageSource} style={styles.backgroundImage} />
            <View style={styles.overlay}>
                <Text style={styles.text}>{text}</Text>
                <Icon name='information' size={24} style={{color: '#fff'}} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        borderColor: 'black',
        width: 200,
        aspectRatio: 1,
    },
    backgroundImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '30%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Light gray overlay with transparency
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeCard;
