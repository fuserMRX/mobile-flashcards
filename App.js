import React from 'react';
import { View } from 'react-native';
import { handleInitialData } from './actions/shared';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';


// Local Import
import { standardPurple } from './utils/colors';
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
                <SafeAreaProvider>
                    <MobileCardStatusBar backgroundColor={standardPurple} barStyle='light-content'/>
                    <NavigationContainer>
                        <StackTabNavigation />
                    </NavigationContainer>
                </SafeAreaProvider>
            </View>
        );
    }
}

export default connect()(App);
