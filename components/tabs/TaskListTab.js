'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import {
    Icon,
    Container,
    Button,
    Content,
    ListItem,
    Header,
    Body,
    Title,
    Left,
    Right,
} from 'native-base';
import Firebase from '../Firebase';
import firebase from 'firebase';
import moment from 'moment';

export default class TaskListTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name='list' style={{ color: tintColor }} />
        ),
        header: null,
    }

    constructor(props) {
        super(props);

        this.state = {
            tasklist: [],
        }
    }

    async componentDidMount() {
        if (Firebase.shared.uid) {
            this.getTaskList();
        } else {
            firebase.auth().onAuthStateChanged(async user => {
                this.getTaskList();
            });
        }
    }

    async getTaskList() {
        const tasklist = await Firebase.shared.getTasks();
        this.setState({ tasklist });
    }

    _keyExtractor = (item, index) => index.toString();
    _renderItem(item) {
        const limitDate = moment(item.limitDate).format('YYYY/MM/DD')
        return (
            <ListItem>
                <View>
                    <Text>{item.title}</Text>
                    <Text>{limitDate}</Text>
                </View>
            </ListItem>
        );
    }

    _onPressAdd() {
        this.props.navigation.navigate('AddTask');
    }

    render() {
        this.getTaskList();
        return (
            <Container style={styles.container}>
                <Header>
                    <Left />
                    <Body>
                        <Title>Task List</Title>
                    </Body>
                    <Right />
                </Header>
                {/* List */}
                <Content padder>
                    <FlatList
                        data={this.state.tasklist}
                        keyExtractor={this._keyExtractor}
                        renderItem={({ item }) => this._renderItem(item)}
                    />
                </Content>
                {/** Button */}
                <View style={styles.bottom}>
                    <Button style={styles.button}
                        rounded
                        onPress={() => this._onPressAdd()}
                    >
                        <Icon name='add' />
                    </Button>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
        marginLeft: 'auto',
        marginRight: 30,
    }

});