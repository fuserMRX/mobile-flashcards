import React, { Component } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Avatar } from 'react-native-elements';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux';

// Local Import
import { handleAddCard } from '../actions/decks';
import { standardPurple, purple, red } from '../utils/colors';
import { ADDCARDIMAGE } from '../src/image';

class AddCardForm extends Component {
    state = {
        deckQuestion: {
            value: '',
            errorText: ''
        },
        deckAnswer: {
            value: '',
            errorText: ''
        },
        loading: false,
    }

    handleChange = (key, value) => {
        this.setState((prevState) => ({
            [key]: {
                ...prevState[key],
                value: value,
                errorText: ''
            }
        }));
    };

    validateFields() {
        let valid = true;
        Object.keys(this.state).forEach(field => {
            if ((typeof this.state[field] === 'object') &&
                ('value' in this.state[field]) && !this.state[field].value) {
                this.setState((prevState) => ({
                    [field]:{
                        ...prevState[field],
                        errorText: `'ENTER ${field.split('deck')[1].toUpperCase()}' FIELD IS REQUIRED`
                    }
                }));
                valid = false;
            }
        });
        return valid;
    }

    addCard = () => {
        const validationResult = this.validateFields();
        if (!validationResult) {
            return;
        }
        const question = this.state.deckQuestion.value;
        const answer = this.state.deckAnswer.value;
        this.setState(() => ({
            loading: true
        }));
        const { dispatch, deckId, goBack } = this.props;
        const cardObject = {
            question,
            answer
        };
        dispatch(handleAddCard(deckId, cardObject))
            .then(() => {
                goBack();
                this.setState((prevState) => ({
                    ...prevState,
                    deckQuestion: {
                        value: '',
                        errorText: ''
                    },
                    deckAnswer: {
                        value: '',
                        errorText: ''
                    },
                    loading: false,
                }));
            })
            .catch((e) => console.error(e));
    };

    render() {
        const title = 'Please add card question and answer below';
        return (
            <>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.avatar}>
                        <TouchableOpacity>
                            <Avatar
                                rounded
                                size="large"
                                source={ADDCARDIMAGE}
                            />
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <Text style={styles.text}>{title}</Text>
                        <Input
                            placeholder="Enter Question"
                            leftIcon={<MaterialCommunityIcons name="account-question-outline" size={24} color="black" />}
                            onChangeText={val => this.handleChange('deckQuestion', val)}
                            value={this.state.deckQuestion.value}
                            errorStyle={styles.error}
                            errorMessage={this.state.deckQuestion.errorText}
                            inputStyle={styles.inputStyle}
                            selectionColor={purple}
                        />
                        <Input
                            placeholder="Enter Answer"
                            leftIcon={<FontAwesome5 name="compress" size={24} color="black" />}
                            onChangeText={val => this.handleChange('deckAnswer', val)}
                            value={this.state.deckAnswer.value}
                            errorStyle={styles.error}
                            errorMessage={this.state.deckAnswer.errorText}
                            inputStyle={styles.inputStyle}
                            selectionColor={purple}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
                    <View style={styles.container}>
                        <Button
                            icon={
                                <MaterialCommunityIcons name="vote-outline" size={24} color="black" />
                            }
                            title="Submit"
                            type="outline"
                            titleStyle={styles.title}
                            onPress={this.addCard}
                            loading={this.state.loading}
                            loadingProps={styles.loadingBar}
                            buttonStyle={styles.button}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: standardPurple,
        left: 10
    },
    text: {
        textShadowColor: purple,
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 7,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    loadingBar: {
        color: purple,
    },
    inputStyle: {
        color: standardPurple
    },
    button: {
        width: 250
    },
    error: {
        color: red
    },
    avatar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const mapStateToProps = (state, { route, navigation }) => {
    const { deckId } = route.params;
    return {
        deckId,
        goBack: () => navigation.goBack()
    };
};

export default connect(mapStateToProps)(AddCardForm);