'use strict'

import React, { Component } from "react";
import {
    StyleSheet,
    Text,
} from "react-native";
import {
    Container,
    Form,
    Input,
    Item,
    Button,
    Label,
} from "native-base";
import Firebase from './Firebase';

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);

        this.state = ({
            email: '',
            password: '',
        })
    }

    async _signUpUser() {
        const { email, password } = this.state;
        if (password.length < 6) {
            alert('Please enter at least 6 characters');
            return;
        }
        const res = await Firebase.shared.signUp(email, password);
        if (!res) return;
        this.props.navigation.navigate('Main');
    }

    async _loginUser() {
        const { email, password } = this.state;
        const res = await Firebase.shared.login(email, password);
        if (!res) return;
        this.props.navigation.navigate('Main');
    }

    render() {
        return (
            <Container style={styles.container}>
                <Form>
                    {/**Email */}
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </Item>
                    {/**Password */}
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </Item>
                    {/**Button */}
                    <Button
                        style={styles.button}
                        block
                        rounded
                        success
                        onPress={() => this._loginUser(this.state.email, this.state.password)}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </Button>
                    <Button
                        style={styles.button}
                        block
                        rounded
                        onPress={() => this._signUpUser(this.state.email, this.state.password)}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10,
    },
    button: {
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
    }
});