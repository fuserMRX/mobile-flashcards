import React, { Component } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { Input, Button, Text } from 'react-native-elements';
import { connect } from 'react-redux';

// Local Import
import { standardPurple } from '../utils/colors';
import { handleSaveDeck } from '../actions/decks';

class AddDeckForm extends Component {

    state = {
        deckTitle: '',
        error: '',
        loading: false
    };

    handleChange = (value) => {
        const deckTitle = value;
        this.setState(() => ({
            deckTitle,
            error: ''
        }));
    };

    toDeckView = (title) => {
        this.props.navigation.navigate('Deck', { deckId: title });
    };

    handleSubmit = () => {
        const title = this.state.deckTitle;
        const errorText = 'ENTER A TITLE PLEASE';
        if (!title) {
            this.setState(() => ({
                error: errorText
            }));
            return;
        }
        this.setState(() => ({
            loading: true
        }));
        this.props.dispatch(handleSaveDeck(title))
            .then((promiseResult) => {
                if (promiseResult !== 'success') {
                    return this.setState(() => ({
                        error: promiseResult,
                        loading: false
                    }));
                }
                this.setState(() => ({
                    deckTitle: '',
                    loading: false
                }));
                this.toDeckView(title);
            });
    };

    render() {
        const title = 'What is the title of your new Deck?';
        const errorMessage = this.state.error;
        return (
            // Dismiss keyboard when user touches outside the component
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={(Keyboard.dismiss)} accessible={false}>
                <View style={styles.container}>
                    <Text style={styles.text}>{title}</Text>
                    <Input
                        placeholder="Enter Deck Title"
                        leftIcon={<AntDesign name="iconfontdesktop" size={24} color="black" />}
                        onChangeText={this.handleChange}
                        value={this.state.deckTitle}
                        errorStyle={{ color: 'red' }}
                        errorMessage={errorMessage}
                    />
                    <Button
                        icon={
                            <FontAwesome5 name="vote-yea" size={24} color="black" />
                        }
                        title="Create Deck"
                        type="outline"
                        titleStyle={styles.title}
                        onPress={this.handleSubmit}
                        loading={this.state.loading}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // Take all available space in the content around - so that the children can use all available space
        flex: 1,
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: standardPurple
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15
    }
});


export default connect()(AddDeckForm);
