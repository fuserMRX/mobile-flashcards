import React from 'react';
import Constants from 'expo-constants';
import { View, StatusBar } from 'react-native';

const MobileCardStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
};



export default MobileCardStatusBar;