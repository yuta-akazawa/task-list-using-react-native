'use strict'

import React, { Component } from "react";
import {
    StyleSheet,
    Text,
} from "react-native";
import {
    Container,
    Content,
    Header,
    Form,
    Input,
    Item,
    Button,
    Label,
    Body,
    Title,
} from "native-base";

import Firebase from './Firebase';
import firebase from 'firebase';

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

    _signUpUser() {
        const { email, password } = this.state;
        try {
            if (this.state.password.length < 6) {
                alert('Please enter at least 6 characters');
                return;
            }
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(response => {
                    this.props.navigation.navigate('Main');
                })
                .catch(error => {
                    alert(error.message);
                });
        } catch (error) {
            console.error(error);
        }

    }

    _loginUser() {
        const { email, password } = this.state;
        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(response => {
                    this.props.navigation.navigate('Main');
                })
                .catch(error => {
                    alert(error.message);
                })
        } catch (error) {
            console.error(error);
        }

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