import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { IMAGES } from '../constants';


const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={IMAGES.logo} style={styles.image} />
            <Progress.CircleSnail color={['#1d2a56']} size={60} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default SplashScreen;
