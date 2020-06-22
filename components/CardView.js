import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';

// Local Import
import { standardPurple, gray, purple, purpleAnswer, white } from '../utils/colors';

const CardView = (props) => {
    const buttonTitleAnswer = 'Show Answer';
    const buttonTitleQuestion = 'Show Question';

    const [buttonTitleState, changeButtonState] = useState(true);

    let currentAnimatedValue = 0;

    let animatedValue = new Animated.Value(0);
    // Save value between re-render of the hook 'useState' by using useRef hook
    let animatedValueRef = useRef(animatedValue);

    const restoreDefaultFlipCardState = () => {
        changeButtonState(true);
        animatedValueRef.current.setValue(0);
    };

    animatedValueRef.current.addListener(({ value }) => {
        currentAnimatedValue = value;
    });
    const frontInterpolate = animatedValueRef.current.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
    });
    const backInterpolate = animatedValueRef.current.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
    });

    const frontAnimatedStyle = {
        transform: [
            { rotateY: frontInterpolate }
        ]
    };
    const backAnimatedStyle = {
        transform: [
            { rotateY: backInterpolate }
        ]
    };

    const flipCard = () => {
        if (currentAnimatedValue >= 90) {
            Animated.spring(animatedValueRef.current, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(animatedValueRef.current, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }
        changeButtonState(!buttonTitleState);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pagination}>{props.cardsPageCounter}</Text>
            <View style={styles.questions}>
                <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                    <Text style={styles.flipText}>
                        {props.currentCard.question}
                    </Text>
                </Animated.View>
                <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
                    <Text style={styles.flipText}>
                        {props.currentCard.answer}
                    </Text>
                </Animated.View>
            </View>
            <View style={styles.content}>
                <Button
                    icon={
                        buttonTitleState ? <MaterialIcons name="question-answer" size={24} color={standardPurple} /> :
                            <FontAwesome name="question-circle-o" size={24} color={standardPurple} />
                    }
                    title={buttonTitleState ? buttonTitleAnswer : buttonTitleQuestion}
                    type='outline'
                    raised
                    titleStyle={[styles.buttonTitle, { color: buttonTitleState ? purple : purpleAnswer }]}
                    onPress={flipCard}
                    buttonStyle={[styles.button]}
                />
                <Button
                    icon={
                        <AntDesign name="like1" size={24} color={standardPurple} />
                    }
                    title="Correct"
                    raised
                    titleStyle={styles.buttonTitle}
                    onPress={() => {props.goToNextQuestion('correct'); restoreDefaultFlipCardState();}}
                    buttonStyle={[styles.button, { backgroundColor: purple }]}
                />
                <Button
                    icon={
                        <AntDesign name="dislike1" size={24} color={purple} />
                    }
                    title="Incorrect"
                    raised
                    titleStyle={styles.buttonTitle}
                    onPress={() => {props.goToNextQuestion('incorrect'); restoreDefaultFlipCardState();}}
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
    flipCard: {
        width: 300,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        backfaceVisibility: 'hidden',
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: gray,
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    flipCardBack: {
        backgroundColor: purpleAnswer,
        position: 'absolute',
    },
    button: {
        width: 250
    },
    buttonTitle: {
        left: 10
    },
    questions: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    pagination: {
        textShadowColor: purple,
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 7,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    }
});

export default CardView;
