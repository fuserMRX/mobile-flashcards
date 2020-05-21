/* eslint-disable react/display-name */
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

// Local Import
import DecksListView from '../components/DecksListView';
import DeckView from '../components/DeckView';
import AddDeckForm from '../components/AddDeckForm';
import { purple, white, standardPurple } from '../utils/colors';


const Tab = createMaterialTopTabNavigator();
const StackNavigator = createStackNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                showIcon: true,
                style: styles.navigation,
                pressColor: purple,
                activeTintColor: standardPurple,
                indicatorStyle: {
                    backgroundColor: purple
                }
            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />,
                    tabBarLabel: 'Decks',
                }}
                name="Decks" component={DecksListView} />

            <Tab.Screen
                options={{
                    tabBarIcon: ({ tintColor }) => <FontAwesome5 name="plus-square" size={30} color={tintColor} />,
                    tabBarLabel: 'Add Deck'
                }}
                name="Add Deck" component={AddDeckForm} />

        </Tab.Navigator>
    );
};

const StackTabNavigation = () => {
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                options={{
                    headerShown: false
                }}
                name="Tabs" component={TabNavigation} />
            <StackNavigator.Screen
                options={{
                    headerTintColor: white,
                    headerStyle: {
                        backgroundColor: purple
                    }
                }}
                name="Deck"
                component={DeckView} />
        </StackNavigator.Navigator>
    );
};


const styles = StyleSheet.create({
    navigation: {
        top: 30,
        height: 70,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 8,
            height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1,
    },
});

export default StackTabNavigation;