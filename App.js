import React from 'react';
import { View } from 'react-native';
import { handleInitialData } from './actions/shared';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { purple } from './utils/colors';

// Local Import
import StackTabNavigation from './components/StackTabNavigation';
import MobileCardStatusBar from './components/MobileCardStatusBar';

class App extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleInitialData());
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MobileCardStatusBar backgroundColor={purple} barStyle='light-content'/>
                <NavigationContainer>
                    <StackTabNavigation />
                </NavigationContainer>
            </View>
        );
    }
}

export default connect()(App);
