import React, { Component } from "react";
import {
    AppState,
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from "react-native";
import Permissions from "react-native-permissions";

const instructions = Platform.select({
    ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
    android:
        "Double tap R on your keyboard to reload,\n" +
        "Shake or press menu button for dev menu"
});

type Props = {};
type State = {
    appState: string
};

export default class App extends Component<Props, State> {
    state = {
        appState: AppState.currentState
    };

    componentDidMount() {
        AppState.addEventListener("change", this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
    }

    _handleAppStateChange = nextAppState => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            console.log("App has come to the foreground!");
        }
        this.setState({ appState: nextAppState });
    };

    checkPermission = () => {
        console.log("coucou");
        return Permissions.request("camera");
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Current state is: {this.state.appState}</Text>
                <Button
                    title="Request some permissions"
                    onPress={this.checkPermission}
                    style={styles.button}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    button: {
        width: 30,
        height: 30,
        backgroundColor: "red"
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    }
});
