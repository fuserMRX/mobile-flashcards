import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

// Local Import
import QuizResults from './QuizResults';
import CardView from './CardView';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';

const QuizView = (props) => {
    const cards = props.currentDeck.questions;

    const [currentCard, setNextCard] = useState(cards[0]);
    const [rate, setRate] = useState({
        correct: 0,
        incorrect: 0
    });
    const currentIndex = cards.indexOf(currentCard);

    let cardsPageCounter = `${currentIndex + 1}/${cards.length}`;

    const goToNextQuestion = (answerParam) => {
        setRate(prevState => ({
            ...prevState,
            [answerParam]: prevState[answerParam] + 1
        }));
        if (cards[currentIndex + 1]) {
            // Switch to the next card in the deck
            setNextCard(cards[currentIndex + 1]);
        } else {
            // Switch to QuizResults in case we have no more cards in the deck
            setNextCard(null);
            // set up notification for the next day if the quiz is passed
            clearLocalNotification();
            setLocalNotification(true);
        }
    };

    const restartQuiz = () => {
        setNextCard(cards[0]);
        setRate(prevState => ({
            ...prevState,
            correct: 0,
            incorrect: 0
        }));
    };

    return (
        <View style={styles.container}>
            {currentCard ?
                <CardView cardsPageCounter={cardsPageCounter} currentCard={currentCard} goToNextQuestion={goToNextQuestion} /> :
                <QuizResults
                    correctNumber={rate.correct}
                    incorrectNumber={rate.incorrect}
                    restartQuiz={restartQuiz}
                    navigation={props.navigation}
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = ({ decks }, { route }) => {
    const { deckId } = route.params;
    const currentDeck = decks[deckId];
    return {
        deckId,
        currentDeck
    };
};

export default connect(mapStateToProps)(QuizView);
