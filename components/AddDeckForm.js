import React, { Component } from 'react';
import { StyleSheet, Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';

// Local Import
import { standardPurple } from '../utils/colors';
import { handleSaveDeck } from '../actions/decks';

class AddDeckForm extends Component {

    state = {
        deckTitle: '',
        error: false
    };

    handleChange = (value) => {
        const deckTitle = value;
        this.setState(() => ({
            deckTitle,
            error: false
        }));
    };

    toDeckView = (title) => {
        this.props.navigation.navigate('Deck', { deckId: title });
    };

    handleSubmit = () => {
        const title = this.state.deckTitle;
        if (!title) {
            this.setState(() => ({
                error: true
            }));
            return;
        }
        this.props.dispatch(handleSaveDeck(title));
        this.setState(() => ({
            deckTitle: ''
        }));
        this.toDeckView(title);
    };

    render() {
        const title = 'What is the title of your new Deck?';
        const errorMessage = this.state.error ? 'ENTER A TITLE PLEASE' : '';
        return (
            // Dismiss keyboard when user touches outside the component
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={(Keyboard.dismiss)} accessible={false}>
                <View style={styles.container}>
                    <Text>{title}</Text>
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
    }
});


export default connect()(AddDeckForm);
