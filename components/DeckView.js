import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';


// Local Import

const DeckView = (props) => {

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
        <Text>
            Deck View
        </Text>
    );
};

const mapStateToProps = (state, {route}) => {
    const {deckId} = route.params;
    return {
        deckId
    };
};

export default connect(mapStateToProps)(DeckView);
