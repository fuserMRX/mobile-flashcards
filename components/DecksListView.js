import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';

class DecksListView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Deck list view
                </Text>
            </View>
        );
    }
}

const mapStateToProps = ({ decks }) => {
    console.log(decks);
    return {
        decks
    };
};

const styles = StyleSheet.create({
    container: {
        // Take all available space in the content around - so that the children can use all available space
        flex: 1,
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default connect(mapStateToProps)(DecksListView);
