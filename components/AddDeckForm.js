import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { handleSaveDeck } from '../actions/decks';

class AddDeckForm extends Component {

    state = {
        deckTitle: ''
    };

    handleChange = (value) => {
        const deckTitle = value;
        this.setState(() => ({
            deckTitle
        }));
    };

    toDeckView = () => {
        this.props.navigation.navigate('Deck');
    };

    handleSubmit = () => {
        this.props.dispatch(handleSaveDeck(this.state.deckTitle));
        this.setState(() => ({
            deckTitle: ''
        }));
        this.toDeckView();
    };

    render() {
        const title = 'What is the title of your new Deck?';
        return (
            <View style={styles.container}>
                <Text className="text-center">{title}</Text>
                <Input
                    placeholder="Enter Deck Title"
                    leftIcon={<AntDesign name="iconfontdesktop" size={24} color="black" />}
                    style={styles.input}
                    onChangeText={this.handleChange}
                    value={this.state.deckTitle}
                // errorStyle={{ color: 'red' }}
                // errorMessage='ENTER A VALID ERROR HERE'
                />
                <Button
                    icon={
                        <FontAwesome5 name="vote-yea" size={24} color="black" />
                    }
                    title="Create Deck"
                    type="outline"
                    style={styles.button}
                    onPress={this.handleSubmit}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    input: {
        alignSelf: 'center'
    }

});


export default connect()(AddDeckForm);
