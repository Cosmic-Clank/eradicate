import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';
import { LinearGradient } from 'expo-linear-gradient';

const MAX_TEXT_LINES = 3; // Maximum number of lines to show initially

const InformationCard = ({ fact, gradientColors }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandToggle = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.informationCard}>
            <LinearGradient
                // Button Linear Gradient
                colors={gradientColors}
                start={{ x: 0.2, y: 0.6 }}
                end={{ x: 1, y: 1 }}
                style={styles.linearGradient}>

                <Text style={styles.informationCardTitle}>{fact.title}</Text>
                <Text
                    style={[
                        styles.informationCardTextContent,
                        expanded ? styles.expandedText : styles.collapsedText
                    ]}
                    numberOfLines={expanded ? undefined : MAX_TEXT_LINES}
                >
                    {fact.description}
                </Text>
                {/* {!expanded && (
                    <LinearGradient
                        colors={['#00000000', '#00000000']}
                        start={{ x: 0.1, y: 0.1 }}
                        end={{ x: 0.3, y: 0.9 }}
                        style={styles.expandButtonContainer}>
                        <TouchableOpacity onPress={handleExpandToggle}>
                            <Text style={styles.expandButton}>Expand</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                )} */}
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    informationCard: {
        borderRadius: 30,
        marginVertical: 10,
        overflow: 'hidden',
    },
    informationCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: COLORS.WHITE,
    },
    informationCardTextContent: {
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.WHITE,
    },
    collapsedText: {
        overflow: 'hidden',
    },
    expandedText: {
        maxHeight: '100%',
    },
    expandButtonContainer: {
        width: 80,
        height: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,

    },
    expandButton: {
        color: COLORS.WHITE,
        fontSize: 14,
        fontWeight: 'bold',

    },

    linearGradient: {
        padding: 20,
    },
});

export default InformationCard;