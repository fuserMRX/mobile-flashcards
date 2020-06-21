import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Text, Image } from 'react-native-elements';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';


// Local Import
import { purple, standardPurple } from '../utils/colors';
import { SCOREIMAGE } from '../src/image';


const QuizResults = (props) => {
    const calculateScore = (correctNumber, incorrectNumber) => {
        const score = (correctNumber * 100) / (correctNumber + incorrectNumber);
        return score;
    };

    const scoreResult = calculateScore(props.correctNumber, props.incorrectNumber);

    const goToDeck = () => {
        props.navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={SCOREIMAGE}
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator size="large" color={purple} />}
                />
                <Text style={styles.text}>Your score is {scoreResult}% </Text>
                <Text style={styles.text}>({props.correctNumber} correct of {props.correctNumber + props.incorrectNumber} in general)</Text>
            </View>
            <View style={styles.buttons}>
                <Button
                    icon={
                        <FontAwesome5 name="recycle" size={24} color={standardPurple} />
                    }
                    title="Restart Quiz"
                    raised
                    titleStyle={styles.buttonTitle}
                    onPress={props.restartQuiz}
                    buttonStyle={[styles.button, { backgroundColor: purple }]}
                />
                <Button
                    icon={
                        <FontAwesome name="backward" size={24} color={purple} />
                    }
                    title="Back To Deck"
                    raised
                    titleStyle={styles.buttonTitle}
                    onPress={goToDeck}
                    buttonStyle={[styles.button, { backgroundColor: standardPurple }]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textShadowColor: purple,
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 7,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    image: {
        width: 300,
        height: 300
    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttons: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttonTitle: {
        left: 10
    },
    button: {
        width: 250
    },
});

export default QuizResults;
