import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { Card, ListItem, Button } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

// Local Import
import { purple, standardPurple} from '../utils/colors';


const DecksListView = (props) => {
    // eslint-disable-next-line quotes
    const noDeckText = `Sorry, you have no decks - Please add new one on the 'Add Deck' page`;

    const handleCardPress = (title) => {
        props.navigation.navigate('Deck', { deckId: title });
    };

    const goToAddDeck = () => {
        const { navigation } = props;
        navigation.navigate('Add Deck');
    };

    const renderDeck = ({ item }) => (
        <TouchableScale
            friction={2}
            tension={150}
            onPress={() => handleCardPress(item.title)}
            activeScale={0.95}
        >
            <Card >
                <ListItem
                    title={
                        <View style={styles.flatList}>
                            <Text style={styles.text} h3>{item.title}</Text>
                        </View>
                    }
                    subtitle={
                        <View style={styles.flatList}>
                            <Text style={styles.text} h4>
                                {`${item.questions.length} ${(item.questions.length === 1) ? 'card' : 'cards'}`}
                            </Text>
                        </View>
                    }
                    badge={{
                        value: item.questions.length,
                        textStyle: styles.badgeText,
                        badgeStyle: styles.badge
                    }}
                    leftIcon={<MaterialCommunityIcons name="cards-outline" size={35} color="black" />}
                    bottomDivider
                    chevron
                />
            </Card>
        </TouchableScale>
    );
    return (
        <>
            {(props.decks.length > 0) ?
                <View style={(props.decks.length === 1) ? styles.container : { flex: 1 }}>
                    <FlatList
                        keyExtractor={item => item.title}
                        data={props.decks}
                        renderItem={renderDeck}
                    />
                </View> :
                <View style={styles.noDecks}>
                    <Text style={styles.noDecksText}>{noDeckText}</Text>
                    <MaterialCommunityIcons name="emoticon-wink-outline" style={[styles.noDecksText, {fontSize: 60}]}/>
                    <Button
                        icon={
                            <FontAwesome5 name="arrow-alt-circle-right" size={24} color={standardPurple} />
                        }
                        title="Go to Deck Creation"
                        type="outline"
                        iconRight
                        titleStyle={styles.buttonTitle}
                        onPress={goToAddDeck}
                    />
                </View>
            }
        </>
    );
};

const mapStateToProps = ({ decks }) => {
    return {
        decks: Object.values(decks).map((item) => item)
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 250
    },
    flatList: {
        alignItems: 'center'
    },
    text: {
        textShadowColor: purple,
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 7
    },
    badgeText: {
        color: standardPurple,
        fontWeight: 'bold',
        fontSize: 15
    },
    badge: {
        backgroundColor: purple,
        width: 30,
        height: 30,
        borderRadius: 20
    },
    noDecks: {
        flex: 1,
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDecksText: {
        textAlign: 'center',
        textShadowColor: purple,
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 7,
        fontSize: 25,
        fontWeight: 'bold'
    },
    buttonTitle: {
        color: standardPurple,
        textShadowColor: purple,
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 7,
    }
});


export default connect(mapStateToProps)(DecksListView);
