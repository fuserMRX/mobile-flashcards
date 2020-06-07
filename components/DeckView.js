import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button, Text, Avatar } from 'react-native-elements';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import Ripple from 'react-native-material-ripple';


// Local Import
import { standardPurple, purple } from '../utils/colors';
import { CARDIMAGE } from '../src/image';
import { handleDeleteDeck } from '../actions/decks';

const DeckView = (props) => {

    const [loading, changeLoading] = useState({
        button1: false,
        button2: false,
        button3: false
    });

    useEffect(() => {
        setTitle(props.deckId);
    });

    const currentDeck = props.currentDeck;

    const setTitle = (deckId) => {
        if (!deckId) return;

        props.navigation.setOptions({
            title: deckId
        });
    };

    const numberOfQuesitons = currentDeck.questions.length;

    const deleteDeck = () => {
        changeLoading(prevState => ({
            ...prevState,
            button3: true
        }));
        const { dispatch, deckId, navigation } = props;
        dispatch(handleDeleteDeck(deckId))
            .then(() => {
                changeLoading(prevState => ({
                    ...prevState,
                    button3: false
                }));
                navigation.navigate('Decks');
            })
            .catch((e) => console.error(e));
    };

    const goToCardForm = () => {
        changeLoading(prevState => ({
            ...prevState,
            button1: true
        }));
        const { navigation, deckId } = props;
        navigation.navigate('AddCard', { deckId });
        changeLoading(prevState => ({
            ...prevState,
            button1: false
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ripple>
                    <Text h3 style={styles.text}>{props.deckId}</Text>
                </Ripple>
                <Ripple>
                    <Text h4 style={styles.text}>{currentDeck && `${numberOfQuesitons} ${(numberOfQuesitons === 1) ? 'card' : 'cards'}`}</Text>
                </Ripple>
            </View>
            <View style={styles.avatar}>
                <TouchableOpacity>
                    <Avatar
                        rounded
                        size="large"
                        source={CARDIMAGE}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <Button
                    icon={
                        <FontAwesome name="plus" size={24} color={purple} />
                    }
                    title="Add card"
                    titleStyle={[styles.buttonTitle, { color: standardPurple }]}
                    type="outline"
                    buttonStyle={styles.addButton}
                    onPress={goToCardForm}
                    loading={loading.button1}
                    loadingProps={styles.loadingBar}
                />

                <Button
                    icon={
                        <Entypo name="emoji-happy" size={24} color={purple} />
                    }
                    title="Start Quiz"
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.button}
                    loading={loading.button2}
                    loadingProps={styles.loadingBar}
                />
                <Button
                    icon={
                        <FontAwesome name="minus" size={24} color={standardPurple} />
                    }
                    title="Remove Card"
                    titleStyle={[styles.buttonTitle]}
                    buttonStyle={[styles.button, { backgroundColor: purple }]}
                    onPress={deleteDeck}
                    loading={loading.button3}
                />
            </View>
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
        backgroundColor: standardPurple,
        width: 250
    },
    addButton: {
        width: 250,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        textShadowColor: purple,
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 7,
    },
    buttonTitle: {
        left: 10
    },
    avatar: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    loadingBar: {
        color: purple
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
