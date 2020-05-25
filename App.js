import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { handleInitialData } from './actions/shared';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Local Import
import { standardPurple } from './utils/colors';
import StackTabNavigation from './components/StackTabNavigation';
import MobileCardStatusBar from './components/MobileCardStatusBar';

class App extends React.Component {
    state = {
        loading: true,
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(handleInitialData())
            .then(() => {
                this.setState(() => ({
                    loading: false
                }));
            });
    }

    render() {
        return (
            <>
                {this.state.loading ?
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color={standardPurple} />
                    </View> :
                    <View style={{ flex: 1 }}>
                        <SafeAreaProvider>
                            <MobileCardStatusBar backgroundColor={standardPurple} barStyle='light-content' />
                            <NavigationContainer>
                                <StackTabNavigation />
                            </NavigationContainer>
                        </SafeAreaProvider>
                    </View>}
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

export default connect()(App);
