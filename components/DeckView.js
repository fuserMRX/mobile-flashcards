import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { FontAwesome, Entypo } from '@expo/vector-icons';


// Local Import
import { standardPurple } from '../utils/colors';

const DeckView = (props) => {

    const currentDeck = props.currentDeck;

    const setTitle = (deckId) => {
        if (!deckId) return;

        props.navigation.setOptions({
            title: deckId
        });
    };

    useEffect(() => {
        setTitle(props.deckId);
    });

    return (
        <View style={styles.container}>
            <Text>{props.deckId}</Text>
            <Text>{currentDeck && currentDeck.questions.length} cards</Text>
            <Button
                icon={
                    <FontAwesome name="plus" size={24} color="white" />
                }
                title="Add card"
                type="outline"
            />
            <Button
                icon={
                    <Entypo name="emoji-happy" size={24} color="white" />
                }
                title="Start Quiz"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Take all available space in the content around - so that the children can use all available space
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        color: standardPurple
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

export default connect(mapStateToProps)(DeckView);
