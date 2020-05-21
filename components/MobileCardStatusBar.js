import React from 'react';
import { View, StatusBar } from 'react-native';

const MobileCardStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={{ backgroundColor }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );
};



export default MobileCardStatusBar;