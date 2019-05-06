'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { Icon, Container, Header, Body, Title, Content, Button } from 'native-base';
import Firebase from './../Firebase';

export default class ProfileTab extends Component {
    static navigationOptions = {
        title: 'A',
        tabBarIcon: ({ tintColor }) => (
            <Icon name='person' style={{ color: tintColor }} />
        )
    }

    async _logout() {
        console.log('logout')
        const res = await Firebase.shared.logout();
        if (!res) return;
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Task List</Title>
                    </Body>
                </Header>
                <Content>
                    <View>
                        <Text>Profile</Text>
                    </View>
                    <Button
                        full
                        info
                        onPress={() => { this._logout() }}
                    >
                        <Text>Logout</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    }
});