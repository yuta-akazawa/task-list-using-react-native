'use strict'

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import {
    Container,
    Header,
    Button,
    Content,
    Item,
    Input,
    DatePicker,
} from 'native-base';
import Firebase from './Firebase';

export default class AddTaskModalScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            limitDate: new Date(),
            status: false,
        }
        this.setDate = this.setDate.bind(this);
    }
    setDate(newDate) {
        this.setState({ limitDate: newDate });
    }

    async createTask() {
        const { title, description, limitDate, status } = this.state;
        if (title != '') {
            const task = {
                title,
                description,
                limitDate,
                status
            }
            await Firebase.shared.createTask(task);
            this.props.navigation.goBack();
        } else {
            alert('Title is empty, Please type Title.');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Container>
                    <Header>
                        <Text>Type new Task</Text>
                    </Header>
                    <Content>
                        <Item>
                            <Input
                                placeholder='title'
                                onChangeText={title => this.setState({ title })}
                            >
                            </Input>
                        </Item>
                        <Item>
                            <Input
                                placeholder='description'
                                onChangeText={(description) => this.setState({ description })}
                            >
                            </Input>
                        </Item>
                        <Item>
                            <DatePicker
                                defaultDate={new Date()}
                                locale={'jp'}
                                androidMode={'default'}
                                animationType={'slide'}
                                placeHolderText={'Select limit Date'}
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                        </Item>
                        <Button
                            full
                            rounded
                            info
                            onPress={() => this.createTask()}
                        >
                            <Text>Add Task</Text>
                        </Button>
                    </Content>
                </Container>
            </View>
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