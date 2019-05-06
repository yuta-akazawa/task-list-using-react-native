'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import {
    Icon,
    Container,
    Header,
    Body,
    Title,
    Content,
    Button,
} from 'native-base';
import Firebase from '../Firebase';

export default class ProfileTab extends Component {
    static navigationOptions = {
        title: 'A',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='person' style={{ color: tintColor }} />
        )
    }

    async _logout() {
        const res = await Firebase.shared.logout();
        if (!res) return;
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Body>
                        <Title>Task List</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={styles.imagePosition}>
                        <Image
                            source={require('./../../../resources/icons8-customer-64.png')}
                            style={styles.image} />
                    </View>
                    <Button
                        style={styles.button}
                        block
                        rounded
                        info
                        onPress={() => { this._logout() }}
                    >
                        <Text style={styles.buttonText}>Log out</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        margin: 20,
    },
    buttonText: {
        color: '#fff',
    },
    image: {
        width: 100,
        height: 100,
    },
    imagePosition: {
        alignItems: 'center'
    }
});