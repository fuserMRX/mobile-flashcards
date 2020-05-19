import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';

class DecksListView extends Component {
    render() {
        return (
            <Text>
                Deck List View
                {this.props.decks.title}
            </Text>
        );
    }
}

const mapStateToProps = ({ decks }) => {
    console.log(decks);
    return {
        decks
    };
};

export default connect(mapStateToProps)(DecksListView);
